const fs = require("fs");
const path = require("path");
const fetch = require('./node_modules/node-fetch/lib/index');

const configFile = fs.readFileSync(path.resolve(__dirname, "./test-story.json"));
const inputConfig = JSON.parse(configFile.toString());

let config = {
  widgets: [],
  media: {}
};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

fetch('http://node-server-alb-457563499.us-west-2.elb.amazonaws.com/photos')
  .then(res => res.json())
  .then(photos => {
    const photoMap = {};
    photos.forEach(photo => {
      photoMap[photo.id] = photo;
    })

    inputConfig.widgets.forEach(widget => {
      if (widget.type === "text") {
        config.name = inputConfig.name;
        config.widgets.push(widget);
      } else if (widget.type === "media-grid") {
        widget.metadata.mediaIds.forEach(id => {
          // Non-destructively add additional required metadata to the media object
          const media = Object.assign({},
            config.media[id] || {},
            {
              id,
              type: "photo",
              dominantColorHex: rgbToHex(photoMap[id].rgb_r, photoMap[id].rgb_g, photoMap[id].rgb_b),
              width: photoMap[id].width,
              height: photoMap[id].height
            }
          );
          config.media[id] = media;
        });
        config.widgets.push(widget);
      }
    });

    fs.writeFileSync(path.resolve(__dirname, "./test-story-output.json"), JSON.stringify(config, null, 2));
  });
