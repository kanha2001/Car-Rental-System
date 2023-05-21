const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

// exports.authorizeRoles = (...roles)=>{

//     return (req, res,next)=>{
//         const  authorizeRoles=['user','employee']
//         if(!roles.includes(req.user.role)){
//         return next(new ErrorHander(
//                 `Role: ${req.user.role} is not allowed to access this resouce`,403
//             ));
//         }
//         next();
//     };
// };

exports.authorizeRoles = (req, res, next) => {
  const allowedModules = ["admin", "employee"];
  const modulename = req.user.role;
  if (!allowedModules.includes(req.user.role)) {
    return next(
      new ErrorHander(
        `Role: ${req.user.role} is not allowed to access this resouce`,
        403
      )
    );
  }
  next();
};

// aaeta bi kamo koribo je alternative ta mu use korichi
exports.authorizeRole = (req, res, next) => {
  const allowedModules = ["admin"];
  const modulenames = req.user.role;
  if (!allowedModules.includes(req.user.role)) {
    return res.redirect(`/me`);
    // return next(
    //   new ErrorHander(
    //     `Role: ${req.user.role} is not allowed to access this resouce`,
    //     403
    //   )
    // );
  }
  next();
};

// exports.authorizeRole = (...role) => {
//   return (req, res, next) => {
//     if (!role.includes(req.user.role)) {
//       new ErrorHander(
//         `Role: ${req.user.role} is not allow to access this resource`
//       );
//     }
//     next();
//   };
// };
