const app = new Vue({
    el:  "#wrapper",
    created: function(){
        this.getCategories();
        this.getProducts();
    },
    data: { 
        title: "Tienda de Mascotas",
        catalogs: [],
        id_category: 1,
        products: [],
        input_prd: [],
        carts: [],
        total_carts: 0,
        total_cart: 0,
        detailModal: false,
        details_product: { }
    },
    methods:{
        getCategories(){
            axios.get('http://sva.talana.com:8000/api/product-category')
            .then(response=>{
                this.catalogs = response.data;
            })
            .catch(e=>{
                console.log(e);
            })
        },
        getProducts(){
            axios.get('http://sva.talana.com:8000/api/product/')
            .then(response=>{
                for(product of response.data){
                    this.products.push({
                        name: product.name,
                        id: product.id,
                        photo: product.photo,
                        price: product.price,
                        count: 0,
                        category: product.category,
                        description: product.description,
                        stock: product.stock
                    });
                }
            })
            .catch(e=>{
                console.log(e);
            })
        },
        selectCatalog(id_category){
            this.id_category = id_category;
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        addCart(prdt, count){
            for(product of this.products){
                if(prdt == product.id){
                    this.total_cart = (count * parseInt(product.price)) + parseFloat(this.total_cart);
                    this.carts.push({
                        name:  product.name,
                        id : product.id,
                        photo: product.photo,
                        price: product.price,
                        count: count,
                        subtotal: count * parseInt(product.price)
                    });
                    break;
                }
            }
            this.total_carts = this.carts.length;
        },
        addCartModal(prdt, count){
            console.log(prdt);
            for(product of this.products){
                if(prdt == product.id){
                    this.total_cart = (count * parseInt(product.price)) + parseFloat(this.total_cart);
                    this.carts.push({
                        name:  product.name,
                        id : product.id,
                        photo: product.photo,
                        price: product.price,
                        count: count,
                        subtotal: count * parseInt(product.price)
                    });
                    break;
                }
            }
            this.total_carts = this.carts.length;
            this.detailModal = false;
        },
        showModal(prd) {
            for(product of this.products){
                if(prd == product.id){
                    this.details_product = product;
                    break;
                }
            }
            this.detailModal = true;
        },
        increase(idprd) {
            var listproducts = [];
            var singleproduct = {};
            for(product of this.products){
                if(idprd == product.id){
                    listproducts.push({
                        name: product.name,
                        id: product.id,
                        photo: product.photo,
                        price: product.price,
                        count: parseInt(product.count) >= 1 ? parseInt(product.count) - 1 : 0,
                        category: product.category,
                        description: product.description,
                        stock: product.stock
                    });

                    singleproduct = {
                        name: product.name,
                        id: product.id,
                        photo: product.photo,
                        price: product.price,
                        count: parseInt(product.count) >= 1 ? parseInt(product.count) - 1 : 0,
                        category: product.category,
                        description: product.description,
                        stock: product.stock
                    };
                }else{
                    listproducts.push(product);
                }
            }
            this.products = listproducts;
            this.details_product = singleproduct;
        },
        decrease(idprd){
            var listproducts = [];
            var singleproduct = {};
            for(product of this.products){
                if(idprd == product.id){
                    listproducts.push({
                        name: product.name,
                        id: product.id,
                        photo: product.photo,
                        price: product.price,
                        count: parseInt(product.count) < product.stock ? parseInt(product.count) + 1 :  parseInt(product.count),
                        category: product.category,
                        description: product.description,
                        stock: product.stock
                    });

                    singleproduct = {
                        name: product.name,
                        id: product.id,
                        photo: product.photo,
                        price: product.price,
                        count: parseInt(product.count) < product.stock ? parseInt(product.count) + 1 :  parseInt(product.count),
                        category: product.category,
                        description: product.description,
                        stock: product.stock
                    };
                }else{
                    listproducts.push(product);
                }
            }
            this.products = listproducts;
            this.details_product = singleproduct;
        }
    }
})