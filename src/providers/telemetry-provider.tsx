import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  doc, 
  onSnapshot, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  where,
  Timestamp 
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface TelemetryData {
  battery_percentage: number;
  system_cpu: number;
  system_temperature: number;
  system_ram: number;
  video_client_count: number;
  robot_moving: boolean;
  timestamp?: Timestamp;
  [key: string]: any;
}

interface TelemetryContextType {
  live: TelemetryData | null;
  history: TelemetryData[];
  loading: boolean;
  period: string;
  setPeriod: (period: string) => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const [live, setLive] = useState<TelemetryData | null>(null);
  const [history, setHistory] = useState<TelemetryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('Ao vivo');

  // 1. Escuta em Tempo Real (Documento Principal)
  useEffect(() => {
    const unsubLive = onSnapshot(doc(db, 'robots', 'agromotion-robot-01'), (doc) => {
      if (doc.exists()) {
        setLive(doc.data().telemetry as TelemetryData);
        setLoading(false);
      }
    });
    return () => unsubLive();
  }, []);

  // 2. Lógica de Histórico Reativa ao Período
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        let q;
        const historyRef = collection(db, 'robots', 'agromotion-robot-01', 'telemetry-history');

        if (period === 'Ao vivo') {
          // No modo "Ao vivo", mostramos apenas os últimos 20 pontos para o gráfico ser fluido
          q = query(historyRef, orderBy('timestamp', 'desc'), limit(20));
        } else {
          // Calcular o timestamp de corte baseado no período
          const cutoff = new Date();
          if (period === '24H') cutoff.setHours(cutoff.getHours() - 24);
          else if (period === '7 dias') cutoff.setDate(cutoff.getDate() - 7);
          else if (period === '30 dias') cutoff.setDate(cutoff.getDate() - 30);

          q = query(
            historyRef, 
            where('timestamp', '>=', Timestamp.fromDate(cutoff)),
            orderBy('timestamp', 'asc')
          );
        }

        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(d => ({ ...d.data() }) as TelemetryData);
        
        // Se for "Ao vivo", fazemos reverse para a ordem ser cronológica no gráfico (esquerda para a direita)
        setHistory(period === 'Ao vivo' ? docs.reverse() : docs);
      } catch (error) {
        console.error("Erro ao procurar histórico:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [period]);

  return (
    <TelemetryContext.Provider value={{ live, history, loading, period, setPeriod }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) throw new Error('useTelemetry must be used within TelemetryProvider');
  return context;
}