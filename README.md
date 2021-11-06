# 📙 노션(Notion) 클론 프로젝트

API 사용에 대해 궁금한 점은 슬랙 '질의응답' 채널에 질문 남겨주세요!

- 과제 기간: 11월 5일(금) ~ 11월 10일(수)
- 리뷰 기간: 11월 10일(수) ~ 11월 17일(수)

## 요구사항

![Notion Workspace Screenshot](https://github.com/KDT1-FE/JS-Mission3/blob/main/_assets/notion-clone.jpg?raw=true)

### 필수 요구사항

워크스페이스는 부모-자식 관계를 만들 수 있습니다.

- [ ] 워크스페이스 전체 목록을 확인할 수 있어야 합니다.
  - [ ] 하위 워크스페이스 항목을 확인할 수 있어야 합니다.
- [ ] 워크스페이스를 추가할 수 있어야 합니다.
- [ ] 워크스페이스를 수정할 수 있어야 합니다.
- [ ] 워크스페이스를 삭제할 수 있어야 합니다.
- [ ] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### 선택 요구사항

- [ ] 하위 워크스페이스가 4단계 이상 추가되지 않도록 만들어 보세요.
- [ ] 워크스페이스의 읽기 권한만 있는 페이지와 쓰기 가능한 페이지를 구분해 보세요.
- [ ] 현재 워크스페이스의 경로가 표시되도록 만들어 보세요.
- [ ] HTML `contenteditable` 속성을 활용해 내용 입력란을 제공해 보세요.(3점)
- [ ] 여러 API 요청(Request)에 대한 로딩 애니메이션을 추가해 보세요.(3점)
- [ ] SCSS, Bootstrap 등을 구성해 프로젝트를 최대한 예쁘게(?) 만들어 보세요.(2점)

현재 워크스페이스의 경로 표시

![현재 워크스페이스 경로 표시](https://github.com/KDT1-FE/JS-Mission3/blob/main/_assets/notion-clone-header.jpg?raw=true)

## API 사용법

- 요청 주소(Endpoint): `https://us-central1-heropy-api.cloudfunctions.net/api/notion/workspaces`

모든 API 요청(Request) `headers`에 다음 정보가 꼭 포함되어야 합니다.<br>
`username`은 다른 사람과 겹치지 않도록 주의하세요!<br>
본명으로 만들면 나중에 문제가 발생했을 때 찾기가 쉬워요.(E.g. `ParkYoungWoong`)

```json
{
  "content-type": "application/json",
  "apikey": "FcKdtJs202110",
  "username": "<YOUR_NAME>"
}
```

API 사용 예시:

```js
async function createWorkspace() {
  const { data } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'ParkYoungWoong'
    },
    data: {
      "title": "신청서",
      "content": "창업지원기관, AC, VC의 지원 사업 모집과 심사를 도와주는 기능"
    }
  })
  console.log(data)
}
```

### 워크스페이스 목록 조회

전체 워크스페이스 목록을 가져옵니다.<br>  
상세 내용은 포함되지 않습니다.

```curl
curl -X 'GET' \ 
https://us-central1-heropy-api.cloudfunctions.net/api/notion/workspaces
```

```plaintext
@return {Object[]} - 조회된 워크스페이스 목록
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
[
  {
    "id": "3OiZYgMWa4oFS84WvcFK",
    "title": "신청서",
    "children": [
      {
        "id": "UafkQsknimBqgxRqzER7",
        "title": "화면 구분 및 정의"
      }
    ]
  },
  {
    "id": "kRFVo45DVRHSpERvEf69",
    "title": "팩트 시트(투자 유치 제안서)"
  }
]
```

### 워크스페이스 상세 내용 조회

단일 워크스페이스의 상세 내용을 가져옵니다.

```curl
curl -X 'GET' \ 
https://us-central1-heropy-api.cloudfunctions.net/api/notion/workspaces/:workspaceId
```

```plaintext
@return {Object} - 단일 워크스페이스의 상세 내용
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
{
  "id": "3OiZYgMWa4oFS84WvcFK",
  "title": "신청서",
  "content": "창업지원기관, AC, VC의 지원 사업 모집과 심사를 도와주는 기능",
  "children": [
    {
      "id": "UafkQsknimBqgxRqzER7",
      "title": "화면 구분 및 정의"
    }
  ]
}
```

### 워크스페이스 생성

워크스페이스를 생성합니다.<br>
워크스페이스의 내용(`content`)은 `<div>`, `<br>` 태그만 허용합니다.

```curl
curl -X 'POST' \ 
https://us-central1-heropy-api.cloudfunctions.net/api/notion/workspaces/:workspaceId
```

```plaintext
@param {String} parentId - 부모 워크스페이스 ID
@param {title} title - 워크스페이스 제목 (필수)
@param {content} content - 워크스페이스 내용 (필수)
@return {Object} - 생성된 워크스페이스 객체
```

요청 데이터 예시:

```json
{
  "title": "신청서",
  "content": "창업지원기관, AC, VC의 지원 사업 모집과 심사를 도와주는 기능"
}
```

응답 데이터 예시:

```json
{
  "id": "3OiZYgMWa4oFS84WvcFK",
  "title": "신청서",
  "content": "창업지원기관, AC, VC의 지원 사업 모집과 심사를 도와주는 기능"
}
```

### 워크스페이스 수정

워크스페이스를 수정합니다.<br>
워크스페이스의 내용(`content`)은 `<div>`, `<br>` 태그만 허용합니다.

```curl
curl -X 'PUT' \ 
https://us-central1-heropy-api.cloudfunctions.net/api/notion/workspaces/:workspaceId
```

```plaintext
@param {String} parentId - 부모 워크스페이스 ID, 부모 워크스페이스를 삭제하는 경우 '-1' 
@param {title} title - 워크스페이스 제목 (필수)
@param {content} content - 워크스페이스 내용 (필수)
@return {Object} - 수정된 워크스페이스 객체
```

요청 데이터 예시:

```json
{
  "parentId": "-1",
  "title": "화면 구분 및 정의",
  "content": "신청서를 관리하기 위한 정보의 항목을 테이블에서는 칼럼, 폼에서는 질문이라 칭합니다.(칼럼과 폼은 연결되어있음)"
}
```

응답 데이터 예시:

```json
{
  "id": "UafkQsknimBqgxRqzER7",
  "title": "화면 구분 및 정의",
  "content": "신청서를 관리하기 위한 정보의 항목을 테이블에서는 칼럼, 폼에서는 질문이라 칭합니다.(칼럼과 폼은 연결되어있음)"
}
```

### 워크스페이스 삭제

특정 워크스페이스를 삭제합니다.<br>
자식 워크스페이스의 부모 워크스페이스 참조도 같이 삭제됩니다.

```curl
curl -X 'DELETE' \ 
https://us-central1-heropy-api.cloudfunctions.net/api/notion/workspaces/:workspaceId
```

```plaintext
@return {Boolean} - 워크스페이스 삭제 여부
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
true
```
