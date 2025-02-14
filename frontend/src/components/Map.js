import * as React from 'react';
import {Component} from 'react';
import MapGL from 'react-map-gl';
import {Editor, DrawPolygonMode, EditingMode} from 'react-map-gl-draw';

import ControlPanel from './control-panel';
import {getFeatureStyle, getEditHandleStyle} from './style';
import axios from 'axios';
const TOKEN = 'pk.eyJ1IjoidHBpbnRvNyIsImEiOiJja2JicDAyMWUwM2VkMnpxdmM4ejhpdThwIn0.JXda4GyCIuQfTE1TAsLorg'; // Set your mapbox token here

export default class Map extends Component {
  constructor(props) {
    super(props);
    this._editorRef = null;
    this.state = {
      viewport: {
        longitude: -91.874,
        latitude: 42.76,
        zoom: 12
      },
      mode: null,
      selectedFeatureIndex: null
    };
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _onSelect = options => {
    this.setState({selectedFeatureIndex: options && options.selectedFeatureIndex});
  };

  _onDelete = () => {
    const selectedIndex = this.state.selectedFeatureIndex;
    if (selectedIndex !== null && selectedIndex >= 0) {
      this._editorRef.deleteFeatures(selectedIndex);
    }
  };

  _onAdd = () => {
    const selectedIndex = this.state.selectedFeatureIndex;
    if (selectedIndex !== null && selectedIndex >= 0) {
        const coordinates = this._editorRef.getFeatures(selectedIndex)[0].geometry.coordinates[0];
        fetch("http://localhost:8000/polygon/create", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                coordinates: coordinates
            })
        })
    }
      
  }

  _onUpdate = ({editType}) => {
    if (editType === 'addFeature') {
      this.setState({
        mode: new EditingMode()
      });
    }
  };

  _renderDrawTools = () => {
    // copy from mapbox
    return (
      <div className="mapboxgl-ctrl-top-left">
        <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
            title="Polygon tool (p)"
            onClick={() => this.setState({mode: new DrawPolygonMode()})}
          />
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
            title="Add polygon"
            onClick={this._onAdd}
          />
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
            title="Delete"
            onClick={this._onDelete}
          />
        </div>
      </div>
    );
  };

  _renderControlPanel = () => {
    const features = this._editorRef && this._editorRef.getFeatures();
    let featureIndex = this.state.selectedFeatureIndex;
    if (features && featureIndex === null) {
      featureIndex = features.length - 1;
    }
    const polygon = features && features.length ? features[featureIndex] : null;
    return <ControlPanel containerComponent={this.props.containerComponent} polygon={polygon} />;
  };

  render() {
    const {viewport, mode} = this.state;
    return (
      <MapGL
        {...viewport}
        width="100%"
        height="78%"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={this._updateViewport}
      >
        <Editor
          ref={_ => (this._editorRef = _)}
          style={{width: '100%', height: '100%'}}
          clickRadius={12}
          mode={mode}
          onSelect={this._onSelect}
          onUpdate={this._onUpdate}
          editHandleShape={'circle'}
          featureStyle={getFeatureStyle}
          editHandleStyle={getEditHandleStyle}
        />
        {this._renderDrawTools()}
        {this._renderControlPanel()}
      </MapGL>
    );
  }
}
