<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); exit();
}


$host = 'localhost';
$user = 'root';
$pass = ''; 
$db = 'cine';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Conexión fallida"]);
    exit();
}

function getBody() {
    $body = file_get_contents("php://input");
    return json_decode($body, true);
}

$table = $_GET['table'] ?? '';
$id    = $_GET['id'] ?? null;

switch ($table) {

    case 'salas':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if ($id) {
                $q = $conn->prepare("SELECT * FROM salas WHERE id_sa=?");
                $q->bind_param("i", $id);
                $q->execute();
                $res = $q->get_result();
                echo json_encode($res->fetch_assoc());
            } else {
                $res = $conn->query("SELECT * FROM salas");
                $rows = [];
                while ($row = $res->fetch_assoc()) $rows[] = $row;
                echo json_encode($rows);
            }
            exit();
        }
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = getBody();
            $q = $conn->prepare("INSERT INTO salas (descripcion_sa) VALUES (?)");
            $q->bind_param("s", $data['descripcion_sa']);
            $q->execute();
            echo json_encode(["id_sa" => $conn->insert_id]);
            exit();
        }
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id) {
            $q = $conn->prepare("DELETE FROM salas WHERE id_sa=?");
            $q->bind_param("i", $id);
            $q->execute();
            echo json_encode(["deleted" => true]);
            exit();
        }
        break;
    case 'peliculas':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if ($id) {
                $q = $conn->prepare("SELECT * FROM peliculas WHERE id_pe=?");
                $q->bind_param("i", $id);
                $q->execute();
                $res = $q->get_result();
                echo json_encode($res->fetch_assoc());
            } else {
                $res = $conn->query("SELECT * FROM peliculas");
                $rows = [];
                while ($row = $res->fetch_assoc()) $rows[] = $row;
                echo json_encode($rows);
            }
            exit();
        }
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = getBody();
            $q = $conn->prepare("INSERT INTO peliculas (descripcion_pe, horario_pe, id_sa) VALUES (?, ?, ?)");
            $q->bind_param("ssi", $data['descripcion_pe'], $data['horario_pe'], $data['id_sa']);
            $q->execute();
            echo json_encode(["id_pe" => $conn->insert_id]);
            exit();
        }
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id) {
            $q = $conn->prepare("DELETE FROM peliculas WHERE id_pe=?");
            $q->bind_param("i", $id);
            $q->execute();
            echo json_encode(["deleted" => true]);
            exit();
        }
        break;
    case 'boletos':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if ($id) {
                $q = $conn->prepare("SELECT * FROM boletos WHERE id_bo=?");
                $q->bind_param("i", $id);
                $q->execute();
                $res = $q->get_result();
                echo json_encode($res->fetch_assoc());
            } else {
                $res = $conn->query("SELECT * FROM boletos");
                $rows = [];
                while ($row = $res->fetch_assoc()) $rows[] = $row;
                echo json_encode($rows);
            }
            exit();
        }
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = getBody();
            $q = $conn->prepare("INSERT INTO boletos (descripcion_bo, precio_bo, id_pe) VALUES (?, ?, ?)");
            $q->bind_param("sdi", $data['descripcion_bo'], $data['precio_bo'], $data['id_pe']);
            $q->execute();
            echo json_encode(["id_bo" => $conn->insert_id]);
            exit();
        }
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id) {
            $q = $conn->prepare("DELETE FROM boletos WHERE id_bo=?");
            $q->bind_param("i", $id);
            $q->execute();
            echo json_encode(["deleted" => true]);
            exit();
        }
        break;
    case 'clientes':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if ($id) {
                $q = $conn->prepare("SELECT * FROM clientes WHERE id_cl=?");
                $q->bind_param("i", $id);
                $q->execute();
                $res = $q->get_result();
                echo json_encode($res->fetch_assoc());
            } else {
                $res = $conn->query("SELECT * FROM clientes");
                $rows = [];
                while ($row = $res->fetch_assoc()) $rows[] = $row;
                echo json_encode($rows);
            }
            exit();
        }
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = getBody();
            $q = $conn->prepare("INSERT INTO clientes (nombre, email, id_bo) VALUES (?, ?, ?)");
            $q->bind_param("ssi", $data['nombre'], $data['email'], $data['id_bo']);
            $q->execute();
            echo json_encode(["id_cl" => $conn->insert_id]);
            exit();
        }
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id) {
            $q = $conn->prepare("DELETE FROM clientes WHERE id_cl=?");
            $q->bind_param("i", $id);
            $q->execute();
            echo json_encode(["deleted" => true]);
            exit();
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Tabla o acción no soportada"]);
}

$conn->close();
?>
