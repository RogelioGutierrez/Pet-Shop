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
                console.log(response.data);
                this.catalogs = response.data;
            })
            .catch(e=>{
                console.log(e);
            })
        },
        getProducts(){
            axios.get('http://sva.talana.com:8000/api/product/')
            .then(response=>{
                console.log(response.data);
                //this.catalogs = response.data;
               // this.products = response.data;
                for(product of response.data){
                    product_name  = product.name;
                    product_id = product.id;
                    product_photo = product.photo;
                    product_price = product.price;
                    category  = product.category;
                    count = 0;
                    this.products.push({
                        name: product_name,
                        id :product_id,
                        photo: product_photo,
                        price: product_price,
                        count: count,
                        category: category,
                        count : count
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
        showModal(prd) {
            for(product of this.products){
                console.log(product.id);
                console.log(prd);
                console.log(prd == product.id);
                if(prd == product.id){
                    this.details_product = product;
                    break;
                }
            }
            this.detailModal = true;
        },
        increase(idprd) {
            newproducts = [];
            for(product of this.products){
                if(idprd == product.id){
                    newproducts.push({
                        name: product.name,
                        id: product.id,
                        photo: product.photo,
                        price: product.price,
                        category: product.category,
                        count: parseInt(product.count) >= 1 ? parseInt(product.count) - 1 : 0
                    });
                }else{
                    newproducts.push(product);
                }
            }
            this.products = newproducts;
        },
        decrease(idprd){
            newproducts = [];
            for(product of this.products){
                if(idprd == product.id){
                    product_name  = product.name;
                    product_id = product.id;
                    product_photo = product.photo;
                    product_price = product.price;
                    category  = product.category;
                    count = parseInt(product.count) + 1;
                    newproducts.push({
                        name: product_name,
                        id :product_id,
                        photo: product_photo,
                        price: product_price,
                        count: count,
                        category: category,
                        count : count
                    });
                }else{
                    newproducts.push(product);
                }
            }
            this.products = newproducts;
        }
    },
    computed:{
    }
})