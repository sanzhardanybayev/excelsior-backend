/**
 * @description This Controllers wraps common Mongo methods
 * @author Danybayev Sanzhar
 */
class MongoController {

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async findAndUpdate (Model, searchQuery, payload, callback = () => 0)  {

        try {

            await Model.findOneAndUpdate(
                searchQuery,
                payload
            );

            callback()

        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                this.res.status(409).json({
                    msg: err.message
                });
            } else {
                this.res.status(500).json({
                    msg: 'Unknown Server Error Unknow server error when updating document'
                });
            }
        }


    }

    async insert  (Model, payload)  {

        const model = new Model(payload);

        try {
            await model.save();
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                this.res.status(409).json({
                    msg: err.message
                });
            }

            this.res.status(500).json({
                msg: err
            });
        }

    }
}

module.exports = MongoController