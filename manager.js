let Product = new function () {
    this.pro = document.getElementById('product');
    this.products = ["Son 3CE", "Son Rose Matte", "Son Mac", "Son 3CE", "Son Rose Matte", "Son Mac"];

    this.setLocalStorageProduct = function () {
        localStorage.setItem("products", JSON.stringify(this.products))
    };
    this.getLocalStorageProduct = function () {
        this.products = JSON.parse(localStorage.getItem("products"))
    };
    this.cart = [];
    this.setLocalStorageCart = function () {
        localStorage.setItem("cart", JSON.stringify(this.cart))
    };
    this.getLocalStorageCart = function () {
        this.cart = JSON.parse(localStorage.getItem("cart"))
    };
    this.count = function (dataCount) {
        let count = document.getElementById("count");
        let name = "product";
        if (dataCount) {
            if (dataCount > 1) {
                name = "products";
            }
            count.innerHTML = dataCount + " " + name;
        } else {
            count.innerHTML = "No " + name;
        }
    };
    this.showAll = function () {
        this.getLocalStorageProduct();
        let data = '';
        if (this.products.length > 0) {
            for (let i = 0; i < this.products.length; i++) {
                data += "<tr>";
                data += "<td>" + this.products[i] + "</td>";
                data += '<td><button onclick="Product.edit(' + i + ')">Edit</button></td>';
                data += '<td><button onclick="Product.delete(' + i + ')">Delete</button></td>';
                data += "</tr>";
            }
        }
        this.count(this.products.length);
        this.pro.innerHTML = data;
    };
    this.add = function () {
        let addName = document.getElementById('add-name');
        let product = addName.value;
        if (product) {
            this.products.push(product.trim());
            addName.value = '';
            this.setLocalStorageProduct();
            this.showAll();
        }

    };
    this.edit = function (item) {
        let editName = document.getElementById('edit-name');
        editName.value = this.products[item];
        document.getElementById("spoiler").style.display = 'block';
        self = this;
        document.getElementById('saveEdit').onsubmit = function () {
            let product = editName.value;
            if (product) {
                self.products.splice(item, 1, product.trim());
                editName.value = "";
                closeInput();
                self.setLocalStorageProduct();
                self.showAll();
            }
        }
    };
    this.delete = function (item) {
        this.products.splice(item, 1);
        this.setLocalStorageProduct();
        this.showAll();
    };

    function closeInput() {
        document.getElementById("spoiler").style.display = 'none';
    }

    this.displayUserManager = function () {
        let sout = "";
        if (this.products.length > 0) {
            for (let i = 0; i < this.products.length; i++) {
                sout += "<tr>";
                sout += "<td>" + this.products[i] + "</td>";
                sout += '<td><button onclick="Product.addCart(' + i + ')">Add Cart</button></td>';
                sout += "</tr>";
            }
        }
        document.getElementById("result").innerHTML = sout;
        this.getLocalStorageProduct();
    };
    this.addCart = function (i) {
        let confirmAnswer = confirm("Add your Cart?");
        if (confirmAnswer) {
            this.cart.push(this.products[i]);
            this.setLocalStorageCart();
        } else {
            return 0;
        }
    };
    this.displayUserCart = function () {
        this.getLocalStorageCart();
        let sout="";
        for (let i = 0; i < this.cart.length; i++) {
            sout += "<tr>";
            sout += '<td>' + this.cart[i] + '</td>';
            sout += "</tr>";
        }
        document.getElementById("resultUserCart").innerHTML = sout;
    }
};

Product.showAll();
Product.displayUserCart();

function logout() {
    return window.location = "index.html";
}




