<https://github.com/highlightjs/highlight.js/>

# python
```py
import asyncio
import aiohttp
import time

class ScraperSession:
    """Advanced Context Manager for managing web sessions."""
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = None

    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.session.close()

    async def fetch_page(self, endpoint):
        url = f"{self.base_url}/{endpoint}"
        async with self.session.get(url) as response:
            status = response.status
            text = await response.text()
            return f"Fetched {url} with status {status} (Length: {len(text)})"

async def main():
    urls = ["", "about", "contact", "docs"]  # Example endpoints
    async with ScraperSession("https://www.python.org") as scraper:
        # Create a list of concurrent tasks
        tasks = [scraper.fetch_page(url) for url in urls]
        # Execute tasks concurrently
        results = await asyncio.gather(*tasks)
        for res in results:
            print(res)

if __name__ == "__main__":
    start_time = time.perf_counter()
    asyncio.run(main())
    print(f"Executed in {time.perf_counter() - start_time:.2f} seconds")
```

# dart
```dart
import 'dart:async';
import 'dart:isolate';

// 1. Mixin: Adds reusable, state-independent behavior
mixin LoggerMixin {
  void logInfo(String message) {
    final time = DateTime.now().toIso8601String();
    print('[$time] LOG: $message');
  }
}

// 2. Extension Method: Adds new functionality to an existing class
extension StringValidator on String {
  bool get isValidEmail => contains('@') && contains('.');
}

// 3. Enum with Enhanced Features (Properties)
enum TaskStatus {
  pending('⏳'), 
  inProgress('🚀'), 
  completed('✅');

  final String icon;
  const TaskStatus(this.icon);
}

// 4. Record: Lightweight, anonymous, structured data
typedef ProcessedData = ({String id, int executionTime, bool success});

// 5. Isolate Worker: Concurrency for heavy computational tasks
void isolateWorker(SendPort sendPort) {
  final receivePort = ReceivePort();
  sendPort.send(receivePort.sendPort);

  receivePort.listen((message) {
    if (message is int) {
      // Simulate a CPU-heavy task
      var result = 0;
      for (var i = 0; i < message; i++) {
        result += i;
      }
      // Send result back to the main isolate
      sendPort.send(result);
    }
  });
}

// 6. Main execution flow demonstrating modern Dart features
void main() async {
  print('--- Starting Advanced Dart Example ---');

  // Using Extension Methods
  String email = 'developer@dart.dev';
  print('Is $email valid? ${email.isValidEmail}');

  // Pattern Matching & Destructuring
  final userData = (name: 'Alice', role: 'Admin', active: true);
  switch (userData) {
    case (name: 'Alice', role: 'Admin', active: true):
      print('Pattern Match: Welcome Super Admin Alice!');
    case (name: _, active: true):
      print('Pattern Match: Welcome active standard user.');
    default:
      print('Pattern Match: Unknown user or inactive.');
  }

  // Running a Background Isolate
  print('\nSpawning background isolate...');
  final pReceivePort = ReceivePort();
  await Isolate.spawn(isolateWorker, pReceivePort.sendPort);

  final sendPort = await pReceivePort.first as SendPort;
  final responsePort = ReceivePort();
  
  // Send data to background isolate and wait for it to process
  sendPort.send(100000000);
  final result = await responsePort.first;
  print('Background Isolate computed result: $result');

  // Creating and using a Record to structure data
  ProcessedData finalRecord = (
    id: 'TXN-9984',
    executionTime: 125,
    success: true
  );

  // Enum and Control Flow
  final task = TaskStatus.completed;
  print('Task Status ${task.name} ${task.icon} for Record ID: ${finalRecord.id}');
}
```

# bash
```bash
#!/bin/bash

# ==============================================================================
# Advanced Bash Script Template
# Features: Strict Mode, Error Handling, Logging, Args Parsing, Cleanup
# ==============================================================================

# --- Strict Modes ---
# Exit on error (-e), undefined variables (-u), and pipeline fails (-o pipefail)
set -euo pipefail

# --- Trap and Cleanup ---
# Ensure temporary directories/files are removed on exit, interrupt, or kill
cleanup() {
    local exit_code=$?
    if [[ -n "${TEMP_DIR:-}" ]] && [[ -d "$TEMP_DIR" ]]; then
        rm -rf "$TEMP_DIR"
        log "info" "Temporary directory cleaned up."
    fi
    exit "$exit_code"
}
trap cleanup EXIT INT TERM

# --- Global Variables & Constants ---
readonly SCRIPT_NAME=$(basename "$0")
readonly TEMP_DIR=$(mktemp -d -t "${SCRIPT_NAME}.XXXXXX")
LOG_LEVEL="INFO"

# --- Logging Functions ---
log() {
    local level="$1"
    local message="$2"
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Simple log level filtering
    if [[ "$LOG_LEVEL" == "DEBUG" ]] || [[ "$level" != "DEBUG" ]]; then
        printf "[%s] [%-5s] %s\n" "$timestamp" "${level^^}" "$message" >&2
    fi
}

# --- Advanced Functions ---
process_config() {
    log "info" "Loading configuration..."
    
    # Associative array for environment configs
    declare -A config_map=(
        ["dev"]="://example.com"
        ["staging"]="://example.com"
        ["prod"]="://example.com"
    )
    
    # Validate array key
    if [[ -v "config_map[$ENVIRONMENT]" ]]; then
        log "debug" "Resolved endpoint: ${config_map[$ENVIRONMENT]}"
    else
        log "error" "Unknown environment specified: $ENVIRONMENT"
        exit 1
    fi
}

# --- Argument Parsing ---
parse_args() {
    ENVIRONMENT="dev" # Default value

    while [[ $# -gt 0 ]]; do
        case "$1" in
            -e|--env)
                ENVIRONMENT="$2"
                shift 2
                ;;
            -v|--verbose)
                LOG_LEVEL="DEBUG"
                shift
                ;;
            -h|--help)
                echo "Usage: $SCRIPT_NAME [-e ENVIRONMENT] [-v] [-h]"
                echo "  -e, --env   Environment (dev, staging, prod) [Default: dev]"
                echo "  -v, --verbose Enable debug logging"
                echo "  -h, --help  Display this help and exit"
                exit 0
                ;;
            *)
                log "error" "Unknown argument: $1"
                exit 1
                ;;
        esac
    done
}

# --- Main Execution ---
main() {
    parse_args "$@"
    log "info" "Starting script execution in $ENVIRONMENT mode."
    
    process_config
    
    log "info" "Operation completed successfully."
}

# Pass all arguments to main
main "$@"
```
