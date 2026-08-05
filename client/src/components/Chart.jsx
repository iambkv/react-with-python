import "./Chart.css";

function Chart({ items }) {
  // Create data for bar chart — group items by first letter
  const letterGroups = {};
  items.forEach((item) => {
    const letter = item.name.charAt(0).toUpperCase();
    letterGroups[letter] = (letterGroups[letter] || 0) + 1;
  });

  const sortedLetters = Object.entries(letterGroups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const maxValue = Math.max(...sortedLetters.map(([, v]) => v), 1);

  // Donut chart data
  const withDesc = items.filter((i) => i.description).length;
  const withoutDesc = items.length - withDesc;
  const total = items.length || 1;
  const descPercent = Math.round((withDesc / total) * 100);
  const noDescPercent = 100 - descPercent;

  return (
    <div className="charts-grid">
      {/* Bar Chart */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Items by Letter</h3>
          <span className="chart-badge">{items.length} total</span>
        </div>
        <div className="bar-chart">
          {sortedLetters.length > 0 ? (
            sortedLetters.map(([letter, count]) => (
              <div className="bar-row" key={letter}>
                <span className="bar-label">{letter}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(count / maxValue) * 100}%` }}
                  />
                </div>
                <span className="bar-value">{count}</span>
              </div>
            ))
          ) : (
            <p className="chart-empty">No data yet</p>
          )}
        </div>
      </div>

      {/* Donut Chart */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Completion Rate</h3>
          <span className="chart-badge">{descPercent}% complete</span>
        </div>
        <div className="donut-container">
          <div className="donut">
            <svg viewBox="0 0 36 36">
              <path
                className="donut-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="donut-fill"
                strokeDasharray={`${descPercent}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="donut-center">
              <span className="donut-percent">{descPercent}%</span>
            </div>
          </div>
          <div className="donut-legend">
            <div className="legend-item">
              <span className="legend-dot accent" />
              <span>With description ({withDesc})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot muted" />
              <span>Without description ({withoutDesc})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
