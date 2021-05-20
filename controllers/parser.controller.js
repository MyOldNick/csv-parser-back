const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

module.exports = {
    createJSON: async (req, res) => {

        const {file} = req.files

        const result = []

        let errors = false

        const fileName = await new Date().getTime() + '.csv'

        await file.mv(path.resolve(process.cwd(), 'public', fileName))

        await fs.createReadStream(path.resolve(process.cwd(), 'public', fileName))
            .pipe(csv({separator: ';'}))
            .on('data', (data) => result.push(data))
            .on('end', () => {


                result.forEach((el, index) => {

                    el.id = index + 1
                })


                result.every((el) => {

                    if (!el.fullname || !el.email || !el.phone) {

                        errors = true

                        return false

                    } else {
                        const user = result.find(us => {

                            if (el.email.toLowerCase() === us.email.toLowerCase() || el.phone === us.phone) {

                                if (el.id !== us.id) {
                                    return us
                                }

                            }
                        })

                        if (user) {

                            el.dublicate = user.id

                        } else {

                            el.dublicate = undefined
                        }

                        return true
                    }
                })

                if (errors) {
                    res.status(400).json({success: false, error: `File is not correct`});
                } else res.json(result)

            });

    }
}
