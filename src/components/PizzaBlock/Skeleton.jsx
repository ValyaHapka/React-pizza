import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="293" rx="15" ry="15" width="255" height="32" />
    <rect x="0" y="343" rx="10" ry="10" width="255" height="88" />
    <rect x="0" y="452" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="452" rx="25" ry="25" width="130" height="30" />
  </ContentLoader>
);

export default Skeleton;
