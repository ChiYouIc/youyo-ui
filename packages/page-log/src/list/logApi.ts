import { ParamType, useRequest } from 'youyo-tools/src';

export type OperationLog = ParamType & {
  id?: number;
  traceId: string;
  operator?: object;
  method?: string;
  params?: string;
  result?: string;
  description?: string;
  operation: string;
  operationStatus: string;
  throwable?: string;
  operationTime?: string;
  // auditLogList?: AuditLog[];
  operationStartTime: string;
  operationEndTime: string;
};

export type AuditLog = {
  id: number;
  operationId: number;
  traceId: string;
  auditContent: string;
  operationTime: string;
  level: string;
};

export type LoginLog = {
  id: number;
  userId: number;
  type: number;
  result: string;
  time: string;
  host: string;
};

enum Uri {
  page = '/log/operation/page',
  audit_list = `/log/audit/list`,
  login_log_list = `/log/login`,
}

const { requestTool } = useRequest();

export default class LogApi {
  public static page(params: OperationLog) {
    const { pageNum, pageSize, traceId, operation, operationStatus, operationStartTime, operationEndTime } = params;
    return requestTool?.get<Array<OperationLog>>(Uri.page, {
      pageNum,
      pageSize,
      traceId,
      operation,
      operationStatus,
      operationStartTime,
      operationEndTime,
    });
  }

  public static auditList(traceId: string) {
    return this.requestTool?.get<Array<AuditLog>>(`${Uri.audit_list}/${traceId}`);
  }

  public static loginLog(id: number) {
    return this.requestTool?.get<Array<LoginLog>>(`${Uri.login_log_list}/${id}`);
  }
}
