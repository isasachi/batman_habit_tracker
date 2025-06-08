import React, { useState, useEffect } from 'react';
import { Calendar, Target, TrendingUp, Award, Book, Dumbbell, Eye, Users, CheckCircle, Circle, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

const BatmanHabitTracker = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [habits, setHabits] = useState({});
  const [stats, setStats] = useState({
    totalPoints: 0,
    streak: 0,
    bestWeek: 0
  });

  const phases = {
    1: {
      name: "FUNDAMENTOS",
      weeks: "1-4",
      habits: [
        { id: 'physical', name: 'Físico', icon: Dumbbell, desc: '10 flexiones + 10 sentadillas + 1 min plancha' },
        { id: 'mental', name: 'Mental', icon: Book, desc: '10 min de lectura' },
        { id: 'discipline', name: 'Disciplina', icon: Target, desc: 'Hacer la cama' },
        { id: 'observation', name: 'Observación', icon: Eye, desc: 'Anotar 1 detalle del día' }
      ],
      weeklyGoal: 20,
      maxPoints: 28
    },
    2: {
      name: "EXPANSIÓN",
      weeks: "5-8",
      habits: [
        { id: 'physical', name: 'Físico', icon: Dumbbell, desc: '20 min rutina completa' },
        { id: 'mental', name: 'Mental', icon: Book, desc: '20 min estudio especializado' },
        { id: 'strategic', name: 'Estratégico', icon: Target, desc: '5 min planificando día siguiente' },
        { id: 'social', name: 'Social', icon: Users, desc: 'Conversación significativa' },
        { id: 'observation', name: 'Observación', icon: Eye, desc: 'Registrar 3 detalles' }
      ],
      weeklyGoal: 30,
      maxPoints: 35
    },
    3: {
      name: "INTEGRACIÓN",
      weeks: "9-12",
      habits: [
        { id: 'morning', name: 'Rutina Mañana', icon: Target, desc: '30 min: objetivos + entrenamiento + meditación' },
        { id: 'afternoon', name: 'Rutina Tarde', icon: Book, desc: '45 min: estudio + práctica social' },
        { id: 'evening', name: 'Rutina Noche', icon: TrendingUp, desc: '20 min: revisión + planificación' }
      ],
      weeklyGoal: 15,
      maxPoints: 21,
      advanced: true
    }
  };

  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const fullDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'];

  const getWeekKey = () => `phase${currentPhase}-week${currentWeek}`;
  
  const toggleHabit = (habitId, dayIndex) => {
    const weekKey = getWeekKey();
    const dayKey = `${habitId}-${dayIndex}`;
    
    setHabits(prev => {
      const newHabits = { ...prev };
      if (!newHabits[weekKey]) newHabits[weekKey] = {};
      
      const currentValue = newHabits[weekKey][dayKey] || 0;
      const newValue = currentValue === 2 ? 0 : currentValue + 1;
      newHabits[weekKey][dayKey] = newValue;
      
      return newHabits;
    });
    
    calculateStats();
  };

  const calculateStats = () => {
    const weekKey = getWeekKey();
    const weekHabits = habits[weekKey] || {};
    const weekPoints = Object.values(weekHabits).reduce((sum, val) => sum + val, 0);
    
    setStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + (weekPoints > prev.bestWeek ? weekPoints - prev.bestWeek : 0),
      bestWeek: Math.max(prev.bestWeek, weekPoints)
    }));
  };

  const getHabitStatus = (habitId, dayIndex) => {
    const weekKey = getWeekKey();
    const dayKey = `${habitId}-${dayIndex}`;
    return habits[weekKey]?.[dayKey] || 0;
  };

  const getWeekProgress = () => {
    const weekKey = getWeekKey();
    const weekHabits = habits[weekKey] || {};
    const points = Object.values(weekHabits).reduce((sum, val) => sum + val, 0);
    const currentPhaseData = phases[currentPhase];
    return {
      points,
      percentage: Math.round((points / currentPhaseData.weeklyGoal) * 100),
      goal: currentPhaseData.weeklyGoal
    };
  };

  const nextWeek = () => {
    if (currentPhase === 3 && currentWeek === 4) return;
    
    if (currentWeek === 4) {
      setCurrentPhase(prev => Math.min(prev + 1, 3));
      setCurrentWeek(1);
    } else {
      setCurrentWeek(prev => prev + 1);
    }
  };

  const prevWeek = () => {
    if (currentPhase === 1 && currentWeek === 1) return;
    
    if (currentWeek === 1) {
      setCurrentPhase(prev => Math.max(prev - 1, 1));
      setCurrentWeek(4);
    } else {
      setCurrentWeek(prev => prev - 1);
    }
  };

  const resetProgress = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
      setHabits({});
      setStats({ totalPoints: 0, streak: 0, bestWeek: 0 });
      setCurrentPhase(1);
      setCurrentWeek(1);
    }
  };

  const currentPhaseData = phases[currentPhase];
  const progress = getWeekProgress();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Gotham City Skyline Background - Adjusted for mobile */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <div className="absolute bottom-0 left-0 w-full h-32 sm:h-64 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-8 sm:w-16 h-16 sm:h-32 bg-gray-800 transform skew-x-12"></div>
        <div className="absolute bottom-0 left-10 sm:left-20 w-6 sm:w-12 h-24 sm:h-48 bg-gray-700"></div>
        <div className="absolute bottom-0 left-20 sm:left-36 w-10 sm:w-20 h-20 sm:h-40 bg-gray-800 transform -skew-x-6"></div>
        <div className="absolute bottom-0 right-0 w-12 sm:w-24 h-28 sm:h-56 bg-gray-700 transform skew-x-3"></div>
        <div className="absolute bottom-0 right-16 sm:right-28 w-8 sm:w-16 h-22 sm:h-44 bg-gray-800"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 p-3 sm:p-4">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-6 sm:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent h-px top-1/2"></div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 relative">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent font-black tracking-wider">
              ⚡ BATMAN ⚡
            </span>
            <br />
            <span className="text-lg sm:text-2xl bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent font-light tracking-widest">
              HABIT PROTOCOL
            </span>
          </h1>
          <div className="bg-black/80 border border-yellow-400/30 rounded-lg p-3 sm:p-4 backdrop-blur-sm shadow-2xl shadow-yellow-400/20">
            <p className="text-yellow-400 text-sm sm:text-lg font-medium italic">
              "No es quien soy por dentro, sino lo que hago, lo que me define"
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">- Bruce Wayne</p>
          </div>
        </div>

        {/* Phase Navigation - Mobile optimized */}
        <div className="bg-black/90 border-2 border-yellow-400/50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 backdrop-blur-sm shadow-2xl shadow-yellow-400/10 relative overflow-hidden">
          {/* Bat symbol watermark */}
          <div className="absolute top-2 right-2 text-4xl sm:text-6xl opacity-5">🦇</div>
          
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={prevWeek}
              className="p-2 sm:p-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-yellow-400/20 hover:to-yellow-600/20 border border-yellow-400/30 rounded-lg transition-all duration-300 font-bold text-yellow-400 shadow-lg hover:shadow-yellow-400/20 text-xs sm:text-sm"
              disabled={currentPhase === 1 && currentWeek === 1}
            >
              <ChevronLeft className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">◀ PREV</span>
            </button>
            
            <div className="text-center flex-1 px-2">
              <h2 className="text-lg sm:text-3xl font-black text-yellow-400 tracking-wider mb-1 drop-shadow-lg">
                <span className="block sm:inline">MISSION {currentPhase}:</span>
                <span className="block sm:inline sm:ml-2">{currentPhaseData.name}</span>
              </h2>
              <p className="text-gray-300 font-medium tracking-wide text-xs sm:text-base">
                WEEK {currentWeek} • PROTOCOL {currentPhaseData.weeks}
              </p>
            </div>
            
            <button 
              onClick={nextWeek}
              className="p-2 sm:p-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-yellow-400/20 hover:to-yellow-600/20 border border-yellow-400/30 rounded-lg transition-all duration-300 font-bold text-yellow-400 shadow-lg hover:shadow-yellow-400/20 text-xs sm:text-sm"
              disabled={currentPhase === 3 && currentWeek === 4}
            >
              <ChevronRight className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">NEXT ▶</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs sm:text-sm mb-2 font-semibold">
              <span className="text-yellow-400">PROGRESS: {progress.points}/{progress.goal}</span>
              <span className={progress.percentage >= 100 ? 'text-green-400 font-bold' : 'text-yellow-400'}>
                {progress.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-3 sm:h-4 border border-yellow-400/30 overflow-hidden">
              <div 
                className={`h-3 sm:h-4 rounded-full transition-all duration-700 ${
                  progress.percentage >= 100 
                    ? 'bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-400/50' 
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-400/50'
                }`}
                style={{ width: `${Math.min(progress.percentage, 100)}%` }}
              ></div>
            </div>
            {progress.percentage >= 100 && (
              <div className="text-center mt-2 text-green-400 font-bold animate-pulse text-sm">
                🏆 MISSION ACCOMPLISHED! 🏆
              </div>
            )}
          </div>
        </div>

        {/* Habit Grid - Mobile Card Layout */}
        <div className="bg-black/90 border-2 border-yellow-400/50 rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 backdrop-blur-sm shadow-2xl shadow-yellow-400/10 relative">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 border-b border-yellow-400/30 pb-4">
            <h3 className="text-lg sm:text-2xl font-black text-yellow-400 tracking-widest">
              TRAINING PROTOCOL
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 font-medium">CLASSIFIED • WAYNE ENTERPRISES</p>
          </div>
          
          {/* Mobile: Card Layout, Desktop: Table Layout */}
          <div className="block sm:hidden space-y-4">
            {currentPhaseData.habits.map((habit, index) => {
              const HabitIcon = habit.icon;
              const weekTotal = days.reduce((sum, _, dayIndex) => 
                sum + getHabitStatus(habit.id, dayIndex), 0
              );
              
              return (
                <div key={habit.id} className="bg-black/50 border border-yellow-400/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                        <HabitIcon className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-yellow-400 tracking-wide">{habit.name.toUpperCase()}</div>
                        <div className="text-xs text-gray-400 font-medium">{habit.desc}</div>
                      </div>
                    </div>
                    <div className={`font-black text-lg px-2 py-1 rounded-full border ${
                      weekTotal >= 10 
                        ? 'text-green-400 border-green-400/50 bg-green-400/10' 
                        : 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10'
                    }`}>
                      {weekTotal}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day, dayIndex) => {
                      const status = getHabitStatus(habit.id, dayIndex);
                      return (
                        <div key={dayIndex} className="text-center">
                          <div className="text-xs text-yellow-400 font-bold mb-1">{day}</div>
                          <button
                            onClick={() => toggleHabit(habit.id, dayIndex)}
                            className="w-8 h-8 rounded-full transition-all hover:scale-110 border border-yellow-400/30 shadow-lg hover:shadow-yellow-400/30"
                          >
                            {status === 0 && <Circle className="w-8 h-8 text-gray-600 hover:text-yellow-400" />}
                            {status === 1 && <CheckCircle className="w-8 h-8 text-yellow-500 animate-pulse" />}
                            {status === 2 && <CheckCircle className="w-8 h-8 text-green-500 drop-shadow-lg" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-yellow-400/30">
                  <th className="text-left p-4 font-black text-yellow-400 text-lg tracking-wide">DISCIPLINE</th>
                  {fullDays.map(day => (
                    <th key={day} className="text-center p-4 font-black text-yellow-400 text-sm tracking-widest">
                      {day.toUpperCase()}
                    </th>
                  ))}
                  <th className="text-center p-4 font-black text-yellow-400 text-lg tracking-wide">SCORE</th>
                </tr>
              </thead>
              <tbody>
                {currentPhaseData.habits.map((habit, index) => {
                  const HabitIcon = habit.icon;
                  const weekTotal = days.reduce((sum, _, dayIndex) => 
                    sum + getHabitStatus(habit.id, dayIndex), 0
                  );
                  
                  return (
                    <tr key={habit.id} className="border-t border-yellow-400/20 hover:bg-yellow-400/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                            <HabitIcon className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <div className="font-bold text-lg text-yellow-400 tracking-wide">{habit.name.toUpperCase()}</div>
                            <div className="text-sm text-gray-400 font-medium">{habit.desc}</div>
                          </div>
                        </div>
                      </td>
                      {days.map((_, dayIndex) => {
                        const status = getHabitStatus(habit.id, dayIndex);
                        return (
                          <td key={dayIndex} className="p-4 text-center">
                            <button
                              onClick={() => toggleHabit(habit.id, dayIndex)}
                              className="w-10 h-10 rounded-full transition-all hover:scale-110 border-2 border-yellow-400/30 shadow-lg hover:shadow-yellow-400/30"
                            >
                              {status === 0 && <Circle className="w-10 h-10 text-gray-600 hover:text-yellow-400" />}
                              {status === 1 && <CheckCircle className="w-10 h-10 text-yellow-500 animate-pulse" />}
                              {status === 2 && <CheckCircle className="w-10 h-10 text-green-500 drop-shadow-lg" />}
                            </button>
                          </td>
                        );
                      })}
                      <td className="p-4 text-center">
                        <div className={`font-black text-2xl px-3 py-1 rounded-full border-2 ${
                          weekTotal >= 10 
                            ? 'text-green-400 border-green-400/50 bg-green-400/10' 
                            : 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10'
                        }`}>
                          {weekTotal}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm bg-black/50 rounded-lg p-3 sm:p-4 border border-yellow-400/20">
            <p className="text-yellow-400 font-bold mb-2">🎯 LEGEND • CÓDIGO DE OPERACIONES</p>
            <div className="flex justify-center space-x-3 sm:space-x-6 text-xs">
              <span className="text-gray-400">⚫ PENDIENTE</span>
              <span className="text-yellow-400">🟡 COMPLETADO (1 PT)</span>
              <span className="text-green-400">🟢 EXCELENCIA (2 PTS)</span>
            </div>
            <p className="text-gray-500 text-xs mt-2 italic">Click para alternar estados • Every habit matters</p>
          </div>
        </div>

        {/* Stats Dashboard - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="bg-black/90 border-2 border-yellow-400/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm text-center shadow-2xl shadow-yellow-400/10 hover:shadow-yellow-400/20 transition-shadow">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h3 className="font-black text-sm sm:text-lg mb-2 text-yellow-400 tracking-wide">BEST WEEK</h3>
            <p className="text-2xl sm:text-3xl font-black text-white">{stats.bestWeek}</p>
            <p className="text-yellow-400 text-xs sm:text-sm font-medium">POINTS</p>
          </div>
          
          <div className="bg-black/90 border-2 border-yellow-400/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm text-center shadow-2xl shadow-yellow-400/10 hover:shadow-yellow-400/20 transition-shadow">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="font-black text-sm sm:text-lg mb-2 text-yellow-400 tracking-wide">CURRENT</h3>
            <p className="text-2xl sm:text-3xl font-black text-white">{progress.points}</p>
            <p className="text-yellow-400 text-xs sm:text-sm font-medium">POINTS</p>
          </div>
          
          <div className="bg-black/90 border-2 border-yellow-400/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm text-center shadow-2xl shadow-yellow-400/10 hover:shadow-yellow-400/20 transition-shadow">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="font-black text-sm sm:text-lg mb-2 text-yellow-400 tracking-wide">MISSION</h3>
            <p className="text-2xl sm:text-3xl font-black text-white">{currentPhase}</p>
            <p className="text-yellow-400 text-xs sm:text-sm font-medium">OF 3</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={resetProgress}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 border border-red-400/50 rounded-lg transition-all duration-300 font-black text-white shadow-lg hover:shadow-red-400/20 tracking-wide text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            SYSTEM RESET
          </button>
        </div>

        {/* Motivational Footer - Mobile optimized */}
        <div className="bg-black/90 border-2 border-yellow-400/50 rounded-xl p-4 sm:p-8 shadow-2xl shadow-yellow-400/10 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="text-6xl sm:text-9xl absolute top-2 sm:top-4 left-2 sm:left-4">🦇</div>
            <div className="text-4xl sm:text-6xl absolute bottom-2 sm:bottom-4 right-2 sm:right-4">⚡</div>
          </div>
          
          <div className="text-center relative z-10">
            <h4 className="text-lg sm:text-2xl font-black text-yellow-400 mb-3 sm:mb-4 tracking-widest">
              🎯 WAYNE ENTERPRISES PROTOCOL
            </h4>
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 sm:p-6 mb-3 sm:mb-4">
              <p className="text-sm sm:text-lg font-bold text-yellow-400 mb-2">
                "The discipline between who you want to be and who you are now."
              </p>
              <p className="text-gray-300 font-medium text-sm sm:text-base">
                Each completed habit brings you closer to your Batman version.
                <br />
                <span className="text-yellow-400">Excellence is not an act, but a habit.</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="bg-black/50 border border-yellow-400/20 rounded-lg p-3">
                <div className="font-bold text-yellow-400">🏃‍♂️ PHYSICAL</div>
                <div className="text-gray-400">Body is the weapon</div>
              </div>
              <div className="bg-black/50 border border-yellow-400/20 rounded-lg p-3">
                <div className="font-bold text-yellow-400">🧠 MENTAL</div>
                <div className="text-gray-400">Mind is the shield</div>
              </div>
              <div className="bg-black/50 border border-yellow-400/20 rounded-lg p-3">
                <div className="font-bold text-yellow-400">⚡ DISCIPLINE</div>
                <div className="text-gray-400">Will is the power</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatmanHabitTracker;