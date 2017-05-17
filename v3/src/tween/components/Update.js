var TWEEN_CONST = require('../const');
var UpdateTweenData = require('./UpdateTweenData');

var Update = function (timestamp, delta)
{
    if (this.useFrames)
    {
        delta = 1;
    }

    switch (this.state)
    {
        case TWEEN_CONST.ACTIVE:

            if (UpdateTweenData(this, this.currentTweenData, timestamp, delta))
            {
                //  If this returns true then the current TweenData has completed
                this.playNext();
            }

            break;

        case TWEEN_CONST.LOOP_DELAY:

            this.countdown -= delta;

            if (this.countdown <= 0)
            {
                this.state = TWEEN_CONST.ACTIVE;
            }

            break;

        case TWEEN_CONST.COMPLETE_DELAY:

            this.countdown -= delta;

            if (this.countdown <= 0)
            {
                this.state = TWEEN_CONST.PENDING_REMOVE;
            }

            break;
    }

    return (this.state === TWEEN_CONST.PENDING_REMOVE);
};

module.exports = Update;
