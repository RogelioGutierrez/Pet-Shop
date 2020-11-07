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
        input: []
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
        morePrd(id_product){
            console.log(id_product);
            console.log(this.input);
        }
    }
})