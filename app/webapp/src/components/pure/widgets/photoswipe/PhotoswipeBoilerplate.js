import React, { Component } from "react";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import "./PhotoswipeBoilerplate.css";

/** It is important to only declare this class once, otherwise you get some weird PhotoSwipe clashes. */
class PhotoswipeBoilerplate extends Component {
  render() {
    return (
      <div className="pswp testing" style={{ maxHeight: window.innerHeight, maxWidth: window.innerWidth }} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="pswp__bg" />
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item" />
            <div className="pswp__item" />
            <div className="pswp__item" />
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter" />
              <button
                className="pswp__button pswp__button--close"
                title="Close (Esc)"
              />
              <button
                className="pswp__button pswp__button--share"
                title="Share"
              />
              <button
                className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"
              />
              <button
                className="pswp__button pswp__button--zoom"
                title="Zoom in/out"
              />
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
            />
            <button
              className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
            />
            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoswipeBoilerplate;
