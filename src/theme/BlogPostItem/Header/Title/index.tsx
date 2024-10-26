import React from 'react';
import Title from '@theme-original/BlogPostItem/Header/Title';
import type TitleType from '@theme/BlogPostItem/Header/Title';
import type { WrapperProps } from '@docusaurus/types';
import clsx from 'clsx';

type Props = WrapperProps<typeof TitleType>;

export default function TitleWrapper(props: Props): JSX.Element {
  return (
    <>
      <Title {...props} className={clsx("p-name")} />
    </>
  );
}
