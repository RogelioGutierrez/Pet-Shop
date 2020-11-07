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
        total_cart: 0
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
                this.products = response.data;
               
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
            console.log(prdt);
            for(product of this.products){
                console.log(product.id);
                console.log(prdt);
                console.log(prdt == product.id);
                if(prdt == product.id){
                    product_name  = product.name;
                    product_id = product.id;
                    product_photo = product.photo;
                    product_price = product.price;
                    product_subtotal = count * parseInt(product.price);
                    this.total_cart = parseFloat(product.price) + parseFloat(this.total_cart);
                    this.carts.push({
                        name: product_name,
                        id :product_id,
                        photo: product_photo,
                        price: product_price,
                        count: count,
                        subtotal: product_subtotal
                    });
                    break;
                }
            }
            this.total_carts = this.carts.length;
        },
    },
    computed:{
    }
})