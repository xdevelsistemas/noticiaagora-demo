var api = require('../services/apiCall');

/**
 * Created by clayton on 21/08/15.
 */
module.exports = function() {
    var homeController = {};
    var site = 'http://www.gazetaonline.com.br';

    /**
     * redireciona para a documentacao da api
     * @param req
     * @param res
     * @param id
     * @param taxonomy
     */
    homeController.call = function(req, res) {

        var data = {};

        if (req.params.id) {
            data.widgetId = req.params.id;
        }else{
            data.widgetId = '56d2a5e83fc99ee616803252a69e0b5ac5c9ca5f'
        }

        if (req.params.categoria) {
            data.user = {
                "likes": {"categories": ["conteudo/"+ req.params.categoria.toLowerCase()]}
            }
        }


        if (req.body.context){
            data.context = req.body.context
        }

        if (req.body.user){
            data.user = req.body.user
        }

        api.apiCall('public/widget/data',api.method.POST,data)
            .then(function(response){
                // eliminando itens inválidos
            var itens = response.data.items.filter(function(item){
                return (item.dominantthumbnail && item.description && item.title && item.click_url && item.url)
            });
            return res.status(response.status).json(itens);
            })
            .catch(function(error){
                return res.status(500).json(error);
            })
        ;


    };





    return homeController;
};