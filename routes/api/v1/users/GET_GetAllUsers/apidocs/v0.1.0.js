/**
 * @api {get} /api/v1/users Get All Users
 * @apiGroup User
 * @apiName GetAllUsers
 * @apiVersion 0.1.0
 * @apiDescription Allows for the retrieval of a list of users.
 * @apiPermission auth.isAuthenticated
 *
 * @apiExample {js} JQuery 1.5.x+ Example:
 *     $.get("/api/v1/users?offset=1&limit=20", function(data) {
 *         console.log(data);
 *     });
 *
 * @apiExample {js} Angular 1.5.x+ Example:
 *     $http.get("/api/v1/users?offset=1&limit=20")
 *         .then(function(response) {
 *             console.log(response.data);
 *         });
 *
 * @apiParam {Integer{..255}} offset The page number (also referred to as an offset) for the users that you wish to retrieve.
 * @apiParam {Integer{..50}} limit The total number of users that you wish to be retrieved in the query.
 * @apiParam {String{..255}=emailAddress,createdTs,lastModifiedTs,deletedTs} [fields] This is a comma-separated list of fields that you can additionally retrieve from the resource.
 * @apiParam {String{..255}={+/-}{id,username,emailAddress,createdTs,lastModifiedTs,deletedTs} [sort] This is a +/-, followed by a field name to sort the results on.
 *
 * @apiSuccess (200 - Success) {Object} links Links object.
 * @apiSuccess (200 - Success) {String} links.prev The previous URL in the sequence (if it exists).
 * @apiSuccess (200 - Success) {String} links.self The current URL that was requested.
 * @apiSuccess (200 - Success) {String} links.next The next URL in the sequence (if it exists).
 * @apiSuccess (200 - Success) {String} message The message from the server that can be displayed to the user, if desired.
 * @apiSuccess (200 - Success) {Object[]} data The array of user objects.
 * @apiSuccess (200 - Success) {Object} data.user The user object.
 * @apiSuccess (200 - Success) {String} data.user.id The user's ID.
 * @apiSuccess (200 - Success) {String} data.user.username The user's username.
 * @apiSuccess (200 - Success) {String} [data.user.emailAddress] The user's email address.
 * @apiSuccess (200 - Success) {DateTime} [data.user.createdTs] The timestamp for when the user's profile was created.
 * @apiSuccess (200 - Success) {DateTime} [data.user.lastModifiedTs] The timestamp for when the data for the user's profile was last changed.
 * @apiSuccess (200 - Success) {DateTime} [data.user.deletedTs] The timestamp for when the user's profile was deleted.
 *
 * @apiError (404 - Not Found) {Object} links Links object.
 * @apiError (404 - Not Found) {String} links.self The current URL that was requested.
 * @apiError (404 - Not Found) {String} message No users were found.
 *
 * @apiUse 500
 */