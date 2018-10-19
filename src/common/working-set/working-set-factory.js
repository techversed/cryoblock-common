angular.module('workingSet.workingSetFactory', [])

    .factory('workingSetFactory', ['sessionFactory',

        function (sessionFactory) {
            var WorkingSet = function () {

                var test = "test";


            };

            WorkingSet.prototype = {
                // Refresh
                create: function () {
                    var returnValue = new WorkingSet();
                    console.log("Created a working set entity");

                    return returnValue;
                }



            }

            WorkingSet.create = function () {
                var returnValue = new WorkingSet();
                console.log("Created a working set entity");

                return returnValue;
            };

            return WorkingSet;

        }
    ])
;
