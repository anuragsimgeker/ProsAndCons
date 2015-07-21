angular.module( 'prosAndConsService', [] )

.service( 'prosAndConsService', function(localStorageService) {
  return {

    /**
     * Creates a new pros and cons entry into the localstorage
     * @param  Array pros
     * @param  Array cons
     * @return Boolean      Create success or failure
     */
    create: function (pros, cons, title) {
      var created = false;
      if(localStorageService.isSupported) {
        created = localStorageService.set(localStorageService.length(), JSON.stringify({
          pros: pros,
          cons: cons,
          title: title,
          lastUpdated: Date.now()
        }));
      }
      return created;
    },

    /**
     * Gets all pros and cons lists
     * @return Array
     */
    all: function () {
      var lists = [];
      if(localStorageService.isSupported) {
        var listsIds = localStorageService.keys();
        for (var i = 0; i < listsIds.length; i++) {
          lists.push(JSON.parse(localStorageService.get(listsIds[i])));
        }
      }
      return lists;
    },

    /**
     * Get a list by Id
     * @param  Number id
     * @return Object    List
     */
    get: function (id) {
      var list = {};
      if(localStorageService.isSupported) {
        list = JSON.parse(localStorageService.get(id));
      }
      return list;
    },

    /**
     * Edit a list by Id
     * @param  ListId id
     * @param  Array pros
     * @param  Array cons
     * @param  String title
     * @return Boolean
     */
    edit: function (id, pros, cons, title) {
      var edited = false;
      if (localStorageService.isSupported) {
        edited = localStorageService.set(id, JSON.stringify({
          pros: pros,
          cons: cons,
          title: title,
          lastUpdated: Date.now()
        }));
      }
      return edited;
    },

    /**
     * Remove a list by Id
     * @param  Number id
     * @return Boolean
     */
    remove: function (id) {
      var removed = false;
      if(localStorageService.isSupported) {
        removed = localStorageService.remove(id);
      }
      return removed;
    }
  };
});

