const users = require('./users.routes');
const team = require('./team.routes')
const time = require('./time.routes')
exports.Start = (app) => {
    users(app)
    team(app)
    time(app)
}
