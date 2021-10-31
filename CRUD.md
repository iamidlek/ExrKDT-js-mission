# 데이터의 의미와 동작

> id => PK

> order => 리스트의 실제 순서(유저는 비쥬얼로 조작, 직접입력 하지 않는 부분)  

```text
유니크하게 작성하지 않을 경우 순서가 이상해짐
```

> title => 유저가 입력한 제목

> done => 항목의 실행 여부(따로 done화면에 뿌려주는 부분)

> createdAt => 항목이 만들어진 시각

> updatedAt => 항목이 갱신되어진 시각

# CRUD 요청 코드 예시

## POST

```js
async function createTodo() {
  const { data } = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'YooHyungChul'
    },
    data: {
      "title": "test2",
      "order": 0
    }
  })
  console.log(data)
}
// 응답
{
  order: 50,
  title: 'test',
  done: false,
  createdAt: '2021-10-30T13:41:26.653Z',
  updatedAt: '2021-10-30T13:41:26.653Z',
  id: 'L5uuaJ63ndidv4CytWFZ'
}
```

## GET

```js
async function getTodo() {
  const {data} = await axios({
    url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'YooHyungChul'
    }
  })
  console.log(data)
}
// 응답
[
  {
    id: 'FIyeWHVaoeR0z772DZvV',
    order: 0,
    title: 'test2',
    done: false,
    createdAt: '2021-10-30T13:43:04.237Z',
    updatedAt: '2021-10-30T13:43:04.237Z'
  },
  {
    id: 'L5uuaJ63ndidv4CytWFZ',
    order: 50,
    title: 'test',
    done: false,
    createdAt: '2021-10-30T13:41:26.653Z',
    updatedAt: '2021-10-30T13:41:26.653Z'
  }
]
```

## PUT

### 개별 항목 수정

```js
async function fixItemTodo(id) {
  const {data} = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
    method: 'put',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'YooHyungChul'
    },
    data: {
      "title": "변경하기",
      "done": true,
      "order": 2
    }
  })
  console.log(data)
}
// 응답
'수정된 내용의 항목'
```

### 배열 순서 수정

```js
async function arrangeTodo() {
  const {data} = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder`,
    method: 'put',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'YooHyungChul'
    },
    data: {todoIds: ['FIyeWHVaoeR0z772DZvV','L5uuaJ63ndidv4CytWFZ']}
  })
  console.log(data)
}

// 응답
Boolean
```

## DELETE

```js
async function deleteTodo(id) {
  const {data} = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
    method: 'delete',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202110',
      'username': 'YooHyungChul'
    }
  })
  console.log(data)
}
```
