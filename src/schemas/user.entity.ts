export interface UserEntity {
  id: string; // uuid
  name?: string,
  email?: string,
}

const user: UserEntity = {
  id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  name: 'Ben',
  email: 'ben@google.com',
}