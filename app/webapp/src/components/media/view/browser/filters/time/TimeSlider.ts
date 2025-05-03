import { select, Selection, event } from "d3-selection";
import { scaleUtc, ScaleTime } from "d3-scale";
import { extent } from "d3-array";
import { axisBottom, Axis } from "d3-axis";
import { Media } from "~/rgb-commons/types/media";
import { zoom as d3Zoom } from "d3-zoom";

type Config = {
  rootElementSelector: string;
  data: Array<Media>;
  onMediaIdSelected: (id: string) => void;
  width?: number;
  height?: number;
  activeMediaId?: string;
};

class TimeSilder {
  private data: Array<Media>;

  private rootElementSelector: string;

  private onMediaIdSelected: (id: string) => void;

  private activeMediaId: string | undefined;

  // Chart style
  private width: number;
  private height: number;
  private margin = { top: 0, right: 4, bottom: 20, left: 4 };

  // Chart SVG Elements
  private svg: Selection<SVGSVGElement, any, HTMLElement, undefined>;
  private mediaRects: Selection<any, any, any, any>;

  // Axis Variables
  private gX: Selection<SVGGElement, any, HTMLElement, undefined>;
  private xAxis: Axis<any>;
  private x: ScaleTime<number, number>;
  // Brush uses scaled x and zoom requires original x - https://stackoverflow.com/questions/49786440/d3-update-old-scale-when-pan-and-zoom
  private scaledX: ScaleTime<number, number>;

  constructor({
    rootElementSelector,
    data,
    onMediaIdSelected,
    width = 600,
    height = 70,
    activeMediaId
  }: Config) {
    this.width = width;
    this.height = height;
    this.data;
    this.rootElementSelector = rootElementSelector;
    this.data = data;
    this.onMediaIdSelected = onMediaIdSelected;
    this.activeMediaId = activeMediaId;

    this.createTimeline();
  }

  public updateData(data: Array<Media>) {
    this.data = data;
    this.updateMediaRects();
  }

  public setActiveMediaId(id: string | undefined) {
    this.activeMediaId = id;
    this.updateMediaRects();
  }

  private createTimeline() {
    this.svg = select(this.rootElementSelector)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.initializeZoom();
    this.createXAxis();
    this.updateMediaRects();
  }

  private createXAxis() {
    this.x = scaleUtc()
      .domain(extent(this.data, d => new Date(d.dateTaken)) as [Date, Date])
      .range([this.margin.left, this.width - this.margin.right])
      .nice();
    this.scaledX = this.x;

    this.xAxis = axisBottom(this.x).ticks(6);

    this.gX = this.svg
      .append("g")
      .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
      .call(this.xAxis);
  }

  private updateMediaRects() {
    // FIXME: The exit selection isn't getting called.
    //        This is not the proper way to update data
    if (this.mediaRects) {
      this.mediaRects.remove();
    }

    this.svg
      .append("rect")
      .style("fill", "none")
      .attr("height", this.height - this.margin.bottom - this.margin.top)
      .attr("width", this.width - this.margin.right - this.margin.left)
      .attr("transform", `translate(${this.margin.left}, 0)`);

    const idToClassName = (id: string) => {
      const split = id.split(".");
      return split[split.length - 1];
    };

    const baseRectHeight = this.height - this.margin.bottom - this.margin.top;

    this.mediaRects = this.svg
      .append("g")
      .selectAll("rect")
      .data(this.data)
      .join(
        enter =>
          enter
            .append("rect")
            .attr("width", 5)
            .attr("height", ({ id }) => {
              const height =
                id === this.activeMediaId
                  ? baseRectHeight
                  : baseRectHeight - 20;
              return height;
            })
            .on("mouseover", ({ id }) => {
              select(`.${CSS.escape(idToClassName(id))}`)
                .attr(
                  "height",
                  this.height - this.margin.bottom - this.margin.top
                )
                .raise();
            })
            .on("mouseout", ({ id }) => {
              select(`.${CSS.escape(idToClassName(id))}`).attr(
                "height",
                id === this.activeMediaId ? baseRectHeight : baseRectHeight - 20
              );
            })
            .attr("class", ({ id }) =>
              id === this.activeMediaId
                ? `active ${idToClassName(id)}`
                : `${idToClassName(id)}`
            )
            .attr("fill", ({ dominantColorHex }) => dominantColorHex)
            .on("click", ({ id }) => this.onMediaIdSelected(id))
            .attr("transform", ({ dateTaken, id }) => {
              const marginTop =
                id === this.activeMediaId
                  ? this.margin.top
                  : this.margin.top + 20;
              return `translate(
                  ${this.x(new Date(dateTaken))},
                  ${marginTop}
                )`;
            })
            .style("fill-opacity", ({ id }) =>
              this.activeMediaId && id !== this.activeMediaId ? 0.3 : 1
            )
            .style("cursor", "pointer"),
        undefined,
        // FIXME: The exit selection isn't getting called.
        exit => exit.remove()
      );

    select(".active").raise();
  }

  private initializeZoom() {
    const zoom = d3Zoom<SVGSVGElement, any>()
      .scaleExtent([1, 1000])
      .extent([
        [this.margin.left, 0],
        [this.width - this.margin.right, this.height]
      ])
      .translateExtent([
        [this.margin.left, -Infinity],
        [this.width - this.margin.right, Infinity]
      ])
      .on("zoom", () => this.zoomed())
      // https://github.com/d3/d3-zoom/issues/181
      .filter(() => !event.button);

    this.svg.call(zoom);
  }

  private zoomed() {
    this.scaledX = event.transform.rescaleX(this.x);

    this.gX.call(this.xAxis.scale(this.scaledX));

    this.mediaRects.attr("transform", ({ dateTaken }) => {
      return `translate(
        ${this.scaledX(new Date(dateTaken))},
        ${this.margin.top}
      )`;
    });
  }
}

export default TimeSilder;
