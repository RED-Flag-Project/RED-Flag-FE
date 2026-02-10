export function handleApiError(error) {
  // 서버 응답이 있을 때
  if (error.response) {
    const res = error.response.data
    return {
      status: error.response.status,
      message: res?.message || '알 수 없는 서버 오류가 발생했습니다.',
      code: res?.code,
    }
  }

  // 요청이 갔지만 응답이 없을 때
  if (error.request) {
    return {
      status: null,
      message: '서버에 연결할 수 없습니다. 네트워크를 확인해 주세요.',
    }
  }

  return {
    status: null,
    message: error.message || '알 수 없는 오류가 발생했습니다.',
  }
}
