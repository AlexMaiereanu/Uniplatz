import SharedService from './sharedService';

export default class PostVerification {
    static verifyPost(post) {
    /**
     * Input: Post item (buyerId, description, imageUrl, location, name, ownerId, price)
     */
        const errors = [];
        const email = 'info@uniplatz.co';
        const resultPost = post;
        /** verify the title */
        if (post.name.length < 3) {
            errors.push('Post name is too short. Minimum length is three characters.');
        }
        if (post.name.length > 20) {
            errors.push('Post name is too long. Maximum length is 20 characters.');
        }
        /** verify the price */
        if (!post.price) {
            errors.push('Post price is missing.');
        } else if (isNaN(Number(post.price))) {
            errors.push('Post price is not a number.');
        } 
        else if (post.price < 0) {
            errors.push('Post price must be a positive number.');
        } 
        else {
            /** price is okay -> round the post price to two decimal places */
            resultPost.price = parseFloat(Math.round(post.price * 100) / 100).toFixed(2);
        }
        /** verify the location */
        if (SharedService.possibleLocations().indexOf(post.location) === -1) {
            /** location is not in the list of possible locations */
            const options = SharedService.possibleLocations().join(', ');
            errors.push(`Post location must be one of the following: ${options}`);
        }
        /** verify the description - not needed atm */
        if (post.description.length > 320) {
            errors.push('Post description can not exceed 320 characters.');
        }
        /** verify the image - not here */
        /** verify the owner id */
        if (post.ownerId.length === 0) {
            errors.push('Something went wrong. Please try again in a moment. ' +
                `If this error persists, please contact the team at ${email}`);
        }
        return errors;
    }
}
