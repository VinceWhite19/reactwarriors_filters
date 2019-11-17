import React from "react";

const MovieDetail = ({
  movie: {
    status,
    release_date,
    runtime,
    original_language,
    production_countries,
    budget,
    revenue,
    production_companies,
    genres
  }
}) => {
  return (
    <div className="mt-4">
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Статус </th>
            <td>{status}</td>
          </tr>
          <tr>
            <th scope="row">Дата выхода</th>
            <td>{release_date}</td>
          </tr>
          <tr>
            <th scope="row">Продолжительность</th>
            <td>{runtime} минут</td>
          </tr>
          <tr>
            <th scope="row">Язык оригинала</th>
            <td>{original_language}</td>
          </tr>
          <tr>
            <th scope="row">Страна</th>
            <td>
              {production_countries &&
                production_countries.map(country => (
                  <span key={country.name}>{country.name}</span>
                ))}
            </td>
          </tr>
          <tr>
            <th scope="row">Бюджет</th>
            <td>{budget} $</td>
          </tr>
          <tr>
            <th scope="row">Сборы</th>
            <td>{revenue} $</td>
          </tr>
          <tr>
            <th scope="row">Компания</th>
            <td>
              {production_companies &&
                production_companies.map(company => {
                  return (
                    <div key={company.id}>
                      <span className="badge badge-info mr-4">
                        {company.name}
                      </span>
                    </div>
                  );
                })}
            </td>
          </tr>
          <tr>
            <th scope="row">Жанры</th>
            <td>
              {genres &&
                genres.map(genre => {
                  return (
                    <div key={genre.id}>
                      <span className="badge badge-info mr-4">
                        {genre.name}
                      </span>
                    </div>
                  );
                })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieDetail;
