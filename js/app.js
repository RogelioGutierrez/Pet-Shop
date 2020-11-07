const app = new Vue({
    el:  "#wrapper",
    created: function(){
        this.getCategories();
        this.getProducts(1);
    },
    data: { 
        title: "Tienda de Mascotas",
        catalogs: [],
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
        getProducts(id_category){
            this.products = [];
            axios.get('http://sva.talana.com:8000/api/product/')
            .then(response=>{
                for(product of response.data){
                    if(product.category.id == id_category){
                        this.products.push({
                            name: product.name,
                            id: product.id,
                            photo: product.photo,
                            price: product.price,
                            count: 1,
                            category: product.category,
                            description: product.description,
                            stock: product.stock
                        });
                    }
                }
            })
            .catch(e=>{
                console.log(e);
            })
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        addCart(id, count){
            if(this.repeatCart(id)){
                newcart = [];
                for(product of this.carts){
                   
                    if(id == product.id){
                        newcart.push({
                            name:  product.name,
                            id : product.id,
                            photo: product.photo,
                            price: product.price,
                            count: count + parseInt(product.count),
                            subtotal: (count * parseInt(product.price)) + (product.subtotal)
                        });
                    }else{
                        newcart.push({
                            name:  product.name,
                            id : product.id,
                            photo: product.photo,
                            price: product.price,
                            count: count,
                            subtotal: count * parseInt(product.price)
                        });
                    }
                }
                this.carts = newcart;
                this.total_carts = this.carts.length;
            }else{
                var product = this.searchlistproduct(id);
                this.total_cart = (count * parseInt(product.price)) + parseFloat(this.total_cart);
                this.carts.push({
                    name:  product.name,
                    id : product.id,
                    photo: product.photo,
                    price: product.price,
                    count: count,
                    subtotal: count * parseInt(product.price)
                });
                this.total_carts = this.carts.length;
            }
        },
        addCartModal(id, count){
            if(this.repeatCart(id)){
                newcart = [];
                for(product of this.carts){
                   
                    if(id == product.id){
                        console.log(product.subtotal);
                        newcart.push({
                            name:  product.name,
                            id : product.id,
                            photo: product.photo,
                            price: product.price,
                            count: count + parseInt(product.count),
                            subtotal: (count * parseInt(product.price)) + (product.subtotal)
                        });
                    }else{
                        newcart.push({
                            name:  product.name,
                            id : product.id,
                            photo: product.photo,
                            price: product.price,
                            count: count,
                            subtotal: count * parseInt(product.price)
                        });
                    }
                }
                this.carts = newcart;
                this.total_carts = this.carts.length;
            }else{
                var product = this.searchlistproduct(id);
                this.total_cart = (count * parseInt(product.price)) + parseFloat(this.total_cart);
                this.carts.push({
                    name:  product.name,
                    id : product.id,
                    photo: product.photo,
                    price: product.price,
                    count: count,
                    subtotal: count * parseInt(product.price)
                });
                this.total_carts = this.carts.length;
            }
            this.detailModal = false;
        },
        showModal(id) {
            var product = this.searchlistproduct(id);
            this.details_product = product;
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
                        count: parseInt(product.count) >= 1 ? parseInt(product.count) - 1 : 1,
                        category: product.category,
                        description: product.description,
                        stock: product.stock
                    });

                    singleproduct = {
                        name: product.name,
                        id: product.id,
                        photo: product.photo,
                        price: product.price,
                        count: parseInt(product.count) >= 1 ? parseInt(product.count) - 1 : 1,
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
        },
        searchlistproduct(id){
            for(product of this.products){
                if(id == product.id){
                    return product;
                }
            }
        },
        repeatCart(id){
            flag = false;
            for(product of this.carts){
                if(id == product.id){
                    flag = true;
                    break;
                }
            }
            return flag;
        }
    }
})