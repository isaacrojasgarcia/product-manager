app.controller('productsCtrl', function ($scope, $modal, $filter, Data) 
{
    $scope.product = [];
    Data.get('product').then(function(data){
        $scope.products = data.data;
    });

    // CHANGE PRODUCT STATUS
    $scope.changeProductStatus = function(product){
        product.status = (product.status=="Active" ? "Inactive" : "Active");
        Data.put("product/"+product.id,{status:product.status});
    };

    // DELETE PRODUCTS
    $scope.deleteProduct = function(product){
        if(confirm("Are you sure to remove the product")){
            Data.delete("product/"+product.id).then(function(result){
                $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
            });
        }
    };

    // OPEN PRODUCTS
    $scope.open = function (p,size) 
    {
        var modalInstance = $modal.open({
          templateUrl: 'partials/productEdit.html',
          controller: 'productEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.product.push(selectedObject);
                $scope.product = $filter('orderBy')($scope.product, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.title = selectedObject.title;
                p.description = selectedObject.description;
                p.image = selectedObject.image;
                p.category_id=selectedObject.category_id;
            }
        });
    };
    
    // SCOPE FOR COLUMNS
    $scope.columns = [
                        {text:"id",predicate:"id",sortable:true,dataType:"number"},
                        {text:"title",predicate:"title",sortable:true},
                        {text:"description",predicate:"description",sortable:true},
                        {text:"image",predicate:"image",sortable:true},
                        {text:"category_id",predicate:"category_id",sortable:false,dataType:"number"}
                    ];

});


// PRODUCTS EDIT CONTROLLER
app.controller('productEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.product = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.id > 0) ? 'Update Product' : 'Add New Product';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.product);
        }
        $scope.saveProduct = function (product) {
            <!--product.uid = $scope.uid;-->
            if(product.id > 0){
                Data.put('product/'+product.id, product).then(function (result) {
                    if(result){
                        var x = angular.copy(product);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                
                Data.post('product', product).then(function (result) {
                    if(result){
                        var x = angular.copy(product);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
