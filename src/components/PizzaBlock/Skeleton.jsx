import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="291" rx="13" ry="13" width="276" height="24" />
    <rect x="0" y="331" rx="18" ry="18" width="275" height="83" />
    <rect x="7" y="436" rx="10" ry="10" width="95" height="30" />
    <rect x="126" y="428" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
