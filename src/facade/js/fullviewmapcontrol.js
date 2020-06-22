/**
 * @module M/control/FullViewMapControl
 */

import FullViewMapImplControl from 'impl/fullviewmapcontrol';
import template from 'templates/fullviewmap';

const isFullScreenSupported = () => {
  const body = document.body;
  return !!(body.webkitRequestFullscreen ||
    (body.msRequestFullscreen && document.msFullscreenEnabled) ||
    (body.requestFullscreen && document.fullscreenEnabled));
};

export default class FullViewMapControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor() {
    // 1. checks if the implementation can create PluginControl
    if (M.utils.isUndefined(FullViewMapImplControl)) {
      M.exception('La implementación usada no puede crear controles FullViewMapControl');
    }
    // 2. implementation of this control
    const impl = new FullViewMapImplControl();
    super(impl, 'FullViewMap');

    /**
     * Container of map
     */
    this.source_ = '.m-mapea-container';

    // Event to catch onChange fullscreen state
    document.addEventListener('fullscreenchange', e => this.checkFullScreen(e));
    document.addEventListener('mozfullscreenchange', e => this.checkFullScreen(e));
    document.addEventListener('webkitfullscreenchange', e => this.checkFullScreen(e));
    document.addEventListener('msfullscreenchange', e => this.checkFullScreen(e));
  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  createView(map) {
    return new Promise((success, fail) => {
      const html = M.template.compileSync(template);
      html.querySelector('#btnFullView').addEventListener('click', e => this.clickFullView_(e));
      // Añadir código dependiente del DOM
      success(html);
    });
  }

  /**
   * This function activate o desactivate the fullscreen
   *
   *@function
   */

  clickFullView_(e) {
    const map = this.map_;
    if (!isFullScreenSupported()) {
      return;
    }
    if (!map) {
      return;
    }
    if (this.isFullScreen()) {
      this.exitFullScreen();
    } else {
      let element;
      if (this.source_) {
        element = typeof this.source_ === 'string' ?
          document.querySelector(this.source_) :
          this.source_;
      }
      this.requestFullScreen(element);
    }
  }

  /**
   * This function request to fullscreen an element.
   * @function
   * @param {HTMLElement} element Element to request fullscreen
   */
  requestFullScreen(element) {
    const btn = document.querySelector('#btnFullView');
    btn.className = 'g-cartografia-cancelar';
    btn.title = 'Cerrar Pantalla Completa';

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  /**
   * This function check the element is currently in fullscreen.
   *
   * @public
   * @function
   * @return {boolean}
   */
  isFullScreen() {
    return !!(document.webkitIsFullScreen ||
      document.msFullscreenElement || document.fullscreenElement);
  }

  /**
   * @public
   * @function
   * This function check fullscreen.
   */
  checkFullScreen(e) {
    if (!document.webkitFullscreenElement && !document.mozFullScreenElement &&
      !document.msFullscreenElement) {
      const btn = document.querySelector('#btnFullView');
      btn.className = 'g-cartografia-tamano';
      btn.title = 'Pantalla Completa';
    }
  }

  /**
   * @public
   * @function
   * This function exit fullscreen.
   */
  exitFullScreen() {
    const btn = document.querySelector('#btnFullView');
    btn.className = 'g-cartografia-tamano';
    btn.title = 'Pantalla Completa';

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   */
  equals(control) {
    return control instanceof FullViewMapControl;
  }
}
