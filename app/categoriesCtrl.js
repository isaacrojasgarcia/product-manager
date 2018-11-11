app.controller('categoriesCtrl', function ($scope, $modal, $filter, Data) 
{
    $scope.category = [];
    Data.get('category').then(function(data){
        $scope.categories = data.data;
    });

    // CHANGE CATEGORY STATUS
    $scope.changeCategoryStatus = function(category){
        category.status = (category.status=="Active" ? "Inactive" : "Active");
        Data.put("category/"+category.id,{status:category.status});
    };

    // DELETE PRODUCTS
    $scope.deleteCategory = function(category){
        if(confirm("Are you sure to remove the category")){
            Data.delete("category/"+category.id).then(function(result){
                $scope.categories = _.without($scope.categories, _.findWhere($scope.categories, {id:category.id}));
            });
        }
    };

    // OPEN CATEGORY
    $scope.open = function (p,size) 
    {
        var modalInstance = $modal.open({
          templateUrl: 'partials/categoryEdit.html',
          controller: 'categoryEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.category.push(selectedObject);
                $scope.category = $filter('orderBy')($scope.category, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.name = selectedObject.name;
            }
        });
    };
    
    // SCOPE FOR COLUMNS
    $scope.columns = [
                        {text:"id",predicate:"id",sortable:true,dataType:"number"},
                        {text:"name",predicate:"name",sortable:true},
                    ];

});


// PRODUCTS EDIT CONTROLLER
app.controller('categoryEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.category = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit Category' : 'Add Category';
        $scope.buttonText = (item.id > 0) ? 'Update Category' : 'Add New Category';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.category);
        }
        $scope.saveCategory = function (category) {
            <!--product.uid = $scope.uid;-->
            if(category.id > 0){
                Data.put('category/'+category.id, category).then(function (result) {
                    if(result){
                        var x = angular.copy(category);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                
                Data.post('category', category).then(function (result) {
                    if(result){
                        var x = angular.copy(category);
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
