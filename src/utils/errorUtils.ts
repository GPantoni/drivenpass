export function errorNotFound(entity: string) {
  return {
    type: 'error_not_found',
    message: `Could not find specified "${entity}"`,
  };
}

export function errorConflict(entity: string) {
  return {
    type: 'error_conflict',
    message: `There is a "${entity}" conflict`,
  };
}

export function errorBadRequest(entity: string) {
  return {
    type: 'error_bad_request',
    message: `${entity}`,
  };
}

export function errorForbidden(entity: string) {
  return {
    type: 'error_forbidden',
    message: `${entity}`,
  };
}

export function errorUnauthorized(entity: string) {
  return {
    type: 'error_unauthorized',
    message: `${entity} is not valid`,
  };
}

export function errorUnprocessableEntity(entity: string) {
  return {
    type: 'error_unprocessable_entity',
    message: `${entity}`,
  };
}
