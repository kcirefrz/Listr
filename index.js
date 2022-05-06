const express = require('express');
var bodyParser = require('body-parser');

const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

var tasks = ['Study React', 
             'Study TypeScript',
             'Study SASS',
             'Study MUI'];

app.post('/', (req, res) => {
    tasks.push(req.body.task);
    res.render('index', {name:'Erick', tasksList:tasks});
});

app.get('/', (req, res) => {
    res.render('index', {name:'Erick', tasksList:tasks});
});

app.get('/delete/:id', (req, res) => {
    tasks = tasks.filter(function(val, index) {
        if (index != req.params.id) {
            return val;
        }
    });
    res.render('index', {name:'Erick', tasksList:tasks});
})

app.listen(5000, () => {
    console.log('Server online!');
});