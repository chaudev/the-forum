const HOME = require('~/assets/icons/navbar/normal/home.png');
const COURSE = require('~/assets/icons/navbar/normal/course.png');
const INFORMATION = require('~/assets/icons/navbar/normal/info.png');
const USER = require('~/assets/icons/navbar/normal/user.png');

const HOME_ACTIVE = require('~/assets/icons/navbar/actived/home.png');
const COURSE_ACTIVE = require('~/assets/icons/navbar/actived/course.png');
const INFORMATION_ACTIVE = require('~/assets/icons/navbar/actived/info.png');
const USER_ACTIVE = require('~/assets/icons/navbar/actived/user.png');

const tabIcons = {
  normal: {
    HOME: HOME,
    COURSE: COURSE,
    INFORMATION: INFORMATION,
    USER: USER,
  },
  activated: {
    HOME: HOME_ACTIVE,
    COURSE: COURSE_ACTIVE,
    INFORMATION: INFORMATION_ACTIVE,
    USER: USER_ACTIVE,
  },
};

export default tabIcons;
