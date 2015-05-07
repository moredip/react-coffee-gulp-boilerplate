D = React.DOM

module.exports = React.createClass
  render: ->
     (D.h1 {}, ["Hello! " + @props.name])
  
