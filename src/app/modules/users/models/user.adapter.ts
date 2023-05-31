import { TRole, sId } from 'src/app/utils';
import { UserCreateModel, UserInfoModel, UserUpdateModel } from './user.model';

export interface IAdapter<TL = unknown, TC = TL, TU = TC> {
  adaptOne(item: any): TL;
  adaptAll(data: any): TL[];
  adaptCreateApi(item: any): TC;
  adaptUpdateApi(item: any): TU;
}

export class UserUpdateApi {
  name: string | null;
  password: string | null;
  rol: TRole | null;

  constructor(m?: Partial<UserUpdateApi>) {
    this.name = m?.name || null;
    this.password = m?.password || null;
    this.rol = m?.rol || null;
  }

  static fromModel(model: Partial<UserUpdateModel>): UserUpdateApi {
    return new UserUpdateApi({
      name: model.username,
      password: model.password,
      rol: model.role,
    });
  }
}

export class UserCreateApi extends UserUpdateApi {
  id: sId | null;

  constructor(m?: Partial<UserCreateApi>) {
    super(m);
    this.id = m?.id || null;
  }

  static override fromModel(model: Partial<UserCreateModel>): UserCreateApi {
    return new UserCreateApi({
      id: model.id || null!,
      name: model.username || null!,
      password: model.password || null!,
      rol: model.role || null!,
    });
  }
}

export class UserInfoApi {
  name: string | null;
  rol: TRole | null;
  id: sId | null;

  constructor(m?: UserInfoApi) {
    this.id = m?.id || null;
    this.name = m?.name || null;
    this.rol = m?.rol || null;
  }

  static toModel(modelApi: UserInfoApi): UserInfoModel {
    return new UserInfoModel({
      id: modelApi.id || null!,
      username: modelApi.name || null!,
      role: modelApi.rol || null!,
    });
  }
}

export class UserAdapter implements IAdapter<UserInfoModel, UserCreateApi, UserUpdateApi> {
  adaptAll(data: UserInfoApi[]) {
    return data.map((d) => this.adaptOne(d));
  }

  adaptOne(item: UserInfoApi) {
    return UserInfoApi.toModel(item);
  }

  adaptCreateApi(item: UserCreateModel) {
    return UserCreateApi.fromModel(item);
  }

  adaptUpdateApi(item: UserUpdateModel) {
    return UserUpdateApi.fromModel(item);
  }
}
