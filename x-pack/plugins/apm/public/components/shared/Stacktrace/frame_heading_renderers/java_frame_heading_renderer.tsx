/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiTextColor } from '@elastic/eui';
import { useApmPluginContext } from '../../../../context/apm_plugin/use_apm_plugin_context';
import { FrameHeadingRendererProps } from './';

export function JavaFrameHeadingRenderer({
  stackframe,
  fileDetailComponent: FileDetail,
}: FrameHeadingRendererProps) {
  const { core } = useApmPluginContext();
  const { classname, filename, function: fn } = stackframe;
  const lineNumber = stackframe.line?.number ?? 0;

  const codeUrl = (cls: string | undefined, file: string, lineNum: number) => {
    if (lineNum >= 0) {
      return core.http.basePath.prepend(`/app/code?class=${cls}&file=${file}&lines=${lineNum}`);
    }
    return core.http.basePath.prepend(`/app/code?class=${cls}&file=${file}`);
  }

  return (
    <>
      at <FileDetail>{[classname, fn].join('.')}</FileDetail>(
      <a href={codeUrl(classname, filename, lineNumber)}>
        <FileDetail>
          <EuiTextColor color="#07C">
            {filename}
            {lineNumber > 0 && `:${lineNumber}`}
          </EuiTextColor>
        </FileDetail>
      </a>
      )
    </>
  );
}
