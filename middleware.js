const listing = require("./models/listing");
const review = require("./models/review.js");
const ExError = require("./utility/ExError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isloggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Kindly Login to proceed further!");
        return res.redirect("/login");
    }

    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }

    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

    const list = await listing.findById(id);

    if (!list) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listing");
    }

    if (!list.owner || !list.owner.equals(req.user._id)) {
        req.flash("error", "Only the owner can access this!");
        return res.redirect(`/listing/${id}`);
    }

    next();
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const errmsg = error.details
            .map((ele) => ele.message)
            .join(", ");

        throw new ExError(400, errmsg);
    }

    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errmsg = error.details
            .map((ele) => ele.message)
            .join(", ");

        throw new ExError(400, errmsg);
    }

    next();
};

module.exports.isreviewAuthor = async (req, res, next) => {
    const { id, reviewid } = req.params;

    const currReview = await review.findById(reviewid);

    if (!currReview) {
        req.flash("error", "Review does not exist!");
        return res.redirect(`/listing/${id}`);
    }

    if (!currReview.author || !currReview.author.equals(req.user._id)) {
        req.flash("error", "Only the review author can access this!");
        return res.redirect(`/listing/${id}`);
    }

    next();
};