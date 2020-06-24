/**
 * @module M/plugin/FullViewMap
 */
import 'assets/css/fullviewmap';
import FullViewMapControl from './fullviewmapcontrol';
import api from '../../api';

export default class FullViewMap extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(options = {}) {
    super();
    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = [];

    /**
     * Position of the Plugin
     * Posible values: TR | TL | BL | BR
     * @type {Enum}
     */
    this.position_ = options.position || 'TR';

    /**
     * Value of collapsed Map
     *
     * @private
     * @type {boolean}
     */
    this.fullViewMap_ = false;

    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    this.control_ = new FullViewMapControl();
    this.controls_.push(this.control_);
    this.map_ = map;

    this.panel_ = new M.ui.Panel('panelFullViewMap', {
      className: 'm-plugin-fullviewmap',
      collapsible: false,
      position: M.ui.position[this.position_],
      collapsedButtonClass: 'g-cartografia-flecha-izquierda',
    });
    this.panel_.addControls(this.controls_);
    map.addPanels(this.panel_);
  }


  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api stable
   */
  destroy() {
    this.map_.removeControls([this.control_]);
    [this.control_, this.panel_, this.map_] = [null, null, null];
  }

  /**
   * This function return the control of plugin
   *
   * @public
   * @function
   * @api stable
   */
  getControls() {
    const aControl = [];
    aControl.push(this.control_);
    return aControl;
  }

  /**
   * @getter
   * @public
   */
  get name() {
    return 'fullviewmap';
  }

  /**
   * This function returns the facade map.
   *
   * @public
   * @function
   * @api stable
   */
  get map() {
    return this.map_;
  }

  /**
   * This function returns the position
   *
   * @public
   * @function
   * @api stable
   */
  get position() {
    return this.position_;
  }

  /**
   * This function gets metadata plugin
   *
   * @public
   * @function
   * @api stable
   */
  getMetadata() {
    return this.metadata_;
  }
}
