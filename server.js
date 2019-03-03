import app from './app';
app.set('port', 3001);

app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')}`)
});