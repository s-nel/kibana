/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { ReactNode } from 'react';
import { useApmPluginContext } from '../../../../context/apm_plugin/use_apm_plugin_context';
import { Span } from '../../../../../typings/es_schemas/ui/span';

export function CodeSpanLink({
  span,
  children,
}: {
  readonly span: Span;
  children?: ReactNode;
}) {
  const { core } = useApmPluginContext();

  const codeUrl = (cls: string, file: string, lineNum: number) => {
    if (lineNum && lineNum >= 0) {
      return core.http.basePath.prepend(`/app/code?class=${cls}&file=${file}&lines=${lineNum}`);
    }
    return core.http.basePath.prepend(`/app/code?class=${cls}&file=${file}`);
  }

  const cls: string | undefined = span?.labels['span_origin_class_name'];
  const file: string | undefined = span?.labels['span_origin_file_name'];
  const line: number | undefined = span?.labels['span_origin_file_line'];

  if (cls && file) {
    return <a href={codeUrl(cls, file, line)}>{children}</a>;
  }
  return null
}
