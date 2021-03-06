/**
 * @jsx React.DOM
 */

var React = require('react');

var Dropzone = React.createClass({
  getInitialState: function() {
    return {
      isDragActive: false
    }
  },

  propTypes: {
    onDrop: React.PropTypes.func.isRequired,
    size: React.PropTypes.number,
    style: React.PropTypes.object
  },

  onDragLeave: function(e) {
    this.setState({
      isDragActive: false
    });
    
    this.props.onDragLeave(e);
  },

  onDragOver: function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";

    this.setState({
      isDragActive: true
    });

    this.props.onDragOver(e);
  },

  onDrop: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false
    });

    var files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (this.props.onDrop) {
      this.props.onDrop(files);
    }
  },

  render: function() {

    var className = 'dropzone';
    if (this.state.isDragActive) {
      className += ' active';
    };

    return (
      <div className={this.props.className || className} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Dropzone;
