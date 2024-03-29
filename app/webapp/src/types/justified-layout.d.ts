declare module "justified-layout" {
	export type PhotoDimensions = {
		width: number;
		height: number;
	};

	export type Items = Array<PhotoDimensions>;

	export interface Options {
		/**
		 * The width that boxes will be contained within irrelevant of padding.
		 * @default 1060
		 */
		containerWidth?: number;
		/**
		 * Provide a single integer to apply padding to all sides or provide an object to apply individual values to each side.
		 * @default 10
		 */
		containerPadding?: number | {
			top: number;
			right: number;
			left: number;
			bottom: number;
		};
		/**
		 * Provide a single integer to apply spacing both horizontally and vertically or provide an object to apply individual values to each axis.
		 * @default 10
		 */
		boxSpacing?: number | {
			horizontal: number;
			vertical: number;
		};
		/**
		 * It's called a target because row height is the lever we use in order to fit everything in nicely.
		 * The algorithm will get as close to the target row height as it can.
		 * @default 320
		 */
		targetRowHeight?: number;
		/**
		 * How far row heights can stray from targetRowHeight.
		 * 0 would force rows to be the targetRowHeight exactly and would likely make it impossible to justify.
		 * The value must be between 0 and 1.
		 * @default 0.25
		 */
		targetRowHeightTolerance?: number;
		/**
		 * Will stop adding rows at this number regardless of how many items still need to be laid out.
		 * @default Number.POSITIVE_INFINITY
		 */
		maxNumRows?: number;
		/**
		 * Provide an aspect ratio here to return everything in that aspect ratio.
		 * Makes the values in your input array irrelevant. The length of the array remains relevant.
		 * @default false
		 */
		forceAspectRatio?: boolean | number;
		/**
		 * If you'd like to insert a full width box every n rows you can specify it with this parameter.
		 * The box on that row will ignore the targetRowHeight, make itself as wide as containerWidth - containerPadding and be as tall as its aspect ratio defines.
		 * It'll only happen if that item has an aspect ratio >= 1. Best to have a look at the examples to see what this does.
		 * @default false
		 */
		fullWidthBreakoutRowCadence?: boolean | number;
		/**
		 * By default we'll return items at the end of a justified layout even if they don't make a full row.
		 * If false they'll be omitted from the output.
		 * @default true
		 */
		showWidows?: boolean;
		/**
		 * If widows are visible, how should they be laid out?
		 * @default "left"
		 */
		widowLayoutStyle?: "left" | "justify" | "center";
	}

	export interface Box {
		aspectRatio: number;
		top: number;
		width: number;
		height: number;
		left: number;
	}

	export interface LayoutMetadata {
		containerHeight: number;
		widowCount: number;
		boxes: Array<Box>;
	}

	// FIXME: Typescript is not allowing default exports from modules
	//        (e.g. https://stackoverflow.com/questions/47094210/d-ts-not-compiling-after-typescript-2-6-1)

	export default (input: Array<PhotoDimensions>, options?: Options): LayoutMetadata => { };
};
