import React from 'react';
import appRouter from '~/navigators/appRouter';
import TabItem from '~/components/Tabs/TabItem';

const Tabs = (props: any): any => {
  const {color, route, tabs} = props;

  if (route === appRouter.TABS.HOME) {
    return <TabItem tab={tabs} color={color} text="Trang chủ" name={route} />;
  }

  if (route === appRouter.TABS.COURSE) {
    return <TabItem tab={tabs} color={color} text="Khóa học" name={route} />;
  }

  if (route === appRouter.TABS.INFORMATION) {
    return <TabItem tab={tabs} color={color} text="Thông tin chung" name={route} />;
  }

  if (route === appRouter.TABS.USER) {
    return <TabItem tab={tabs} color={color} text="Tài khoản" name={route} />;
  }
};

export default Tabs;
