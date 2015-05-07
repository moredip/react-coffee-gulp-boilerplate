MainView = require('./views/mainView')

view = React.createElement( MainView,{name: 'World'})

React.render( view, document.getElementById('app-container') )
