import React from 'react';
import { useDevApiLogStore } from '@/store/devApiLogStore';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { XmarkOutlined } from "@lineiconshq/free-icons";
import './DevApiToaster.scss';

const DevApiToaster: React.FC = () => {
    const { logs, removeLog } = useDevApiLogStore();

    if (!import.meta.env.DEV || logs.length === 0) {
        return null;
    }

    return (
        <div className="dev-api-toaster">
            {logs.map((log) => (
                <div 
                    key={log.id} 
                    className={`api-log-item ${log.status >= 400 || log.status === 0 ? 'error' : 'success'}`}
                >
                    <button className="close-btn" onClick={() => removeLog(log.id)}>
                        <Lineicons icon={XmarkOutlined} />
                    </button>
                    
                    <div className="log-header">
                        <div>
                            <span className="method">{log.method}</span>
                            <span className={`status ${log.status >= 400 || log.status === 0 ? 'error' : 'success'}`}>
                                {log.status || 'ERR'}
                            </span>
                        </div>
                    </div>

                    <div className="log-url">{log.url}</div>
                    
                    <div className="log-info">
                        <span>{log.duration}ms</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>

                    {(log.status >= 400 || log.status === 0) && log.errorPayload && (
                        <div className="error-payload">
                            {JSON.stringify(log.errorPayload, null, 2)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DevApiToaster;
