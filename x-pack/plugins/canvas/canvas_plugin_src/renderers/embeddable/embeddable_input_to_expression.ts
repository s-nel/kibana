/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { PaletteRegistry } from 'src/plugins/charts/public';
import { EmbeddableTypes, EmbeddableInput } from '../../expression_types';
import { toExpression as mapToExpression } from './input_type_to_expression/map';
import { toExpression as visualizationToExpression } from './input_type_to_expression/visualization';
import { toExpression as lensToExpression } from './input_type_to_expression/lens';
import { toExpression as genericToExpression } from './input_type_to_expression/embeddable';

export const inputToExpressionTypeMap = {
  [EmbeddableTypes.map]: mapToExpression,
  [EmbeddableTypes.visualization]: visualizationToExpression,
  [EmbeddableTypes.lens]: lensToExpression,
};

/*
  Take the input from an embeddable and the type of embeddable and convert it into an expression
*/
export function embeddableInputToExpression(
  input: EmbeddableInput,
  embeddableType: string,
  palettes: PaletteRegistry,
  useGenericEmbeddable?: boolean
): string | undefined {
  if (useGenericEmbeddable) {
    return genericToExpression(input, embeddableType);
  }

  if (inputToExpressionTypeMap[embeddableType]) {
    return inputToExpressionTypeMap[embeddableType](input as any, palettes);
  }
}
