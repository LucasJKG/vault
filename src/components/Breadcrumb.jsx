import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import '../styles/components/breadcrumb.css';

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter(
      (x) =>
        x &&
        !(x.length >= 10 && /^[A-Za-z0-9_]+$/.test(x)) 
    );

  const formatSegment = (segment) => {
    return decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-link">
        Inicio
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to} className="breadcrumb-item">
            <ChevronRight className="breadcrumb-icon" />
            {isLast ? (
              <span className="breadcrumb-current">{formatSegment(value)}</span>
            ) : (
              <Link to={to} className="breadcrumb-link">
                {formatSegment(value)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
